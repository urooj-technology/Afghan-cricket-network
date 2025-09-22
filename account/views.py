from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.auth import login
import random
import string
from datetime import timedelta
from django.utils import timezone

from account.serializers import (
    UserSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    PasswordResetSerializer,
    RegisterSerializer,
    VerifyOTPSerializer,
)
from account.models import User
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView


class LoginView(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        
        # Set the user in request for Knox
        request.user = user
        
        # Call parent's post method to handle Knox token creation
        response = super().post(request, *args, **kwargs)
        
        # Add custom user data to response
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,  
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_buyer": user.is_buyer,
            "is_seller": user.is_seller,
            "is_finance": user.is_finance,
            "is_admin": user.is_admin,
        }
        
        response.data["user"] = user_data
        return response
    




class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # Only admins can list users


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Any authenticated user can view details


class UserEditView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # Only admins can edit

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  # You can use UserSerializer or create a simpler one if needed
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # Only admins can delete

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(
                serializer.validated_data.get("current_password")
            ):
                return Response(
                    {"current_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Change password
            self.object.set_password(serializer.validated_data.get("new_password"))
            self.object.save()

            # Invalidate all tokens for the user
            AuthToken.objects.filter(user=self.object).delete()

            return Response(
                {
                    "detail": "Password updated successfully. Please login again with your new password.",
                    "require_login": True,
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def generate_otp():
    return "".join(random.choices(string.digits, k=6))


class PasswordResetView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Generate OTP
        otp = generate_otp()
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        # Send email with OTP
        subject = "Password Reset OTP"
        html_message = render_to_string(
            "emails/password_reset_otp.html",
            {
                "user": user,
                "otp": otp,
                "valid_for": "10 minutes",
                "frontend_url": "http://localhost:3000/app/login",
            },
        )

        # Create a plain text version for email clients that don't support HTML
        plain_message = f"""
Password Reset OTP

Hello {user.first_name or user.username},

We received a request to reset your password. Please use the following One-Time Password (OTP) to complete your password reset:

{otp}

This OTP is valid for 10 minutes only.

If you did not request a password reset, please ignore this email or contact support if you have concerns.

Thank you,
The Hasa Book Store Team
        """

        # Send both HTML and plain text versions
        send_mail(
            subject=subject,
            message=plain_message,  # Plain text fallback
            html_message=html_message,  # HTML version
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return Response(
            {"detail": "Password reset OTP has been sent to your email."},
            status=status.HTTP_200_OK,
        )


class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]
        new_password = serializer.validated_data["new_password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if OTP is valid
        if not user.otp or user.otp != otp:
            return Response(
                {"detail": "Invalid OTP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if OTP is expired (10 minutes validity)
        if not user.otp_created_at or timezone.now() > user.otp_created_at + timedelta(
            minutes=10
        ):
            return Response(
                {"detail": "OTP has expired. Please request a new one."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Reset password
        user.set_password(new_password)
        # Clear OTP fields
        user.otp = None
        user.otp_created_at = None
        user.save()

        # Invalidate all tokens for the user
        AuthToken.objects.filter(user=user).delete()

        return Response(
            {
                "detail": "Password has been reset successfully. You can now login with your new password."
            },
            status=status.HTTP_200_OK,
        )


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Profile updated successfully", "user": serializer.data},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        #         # Send welcome email
        #         subject = "Welcome to Hasa Book Store"
        #         html_message = render_to_string(
        #             "emails/welcome_email.html",
        #             {
        #                 "user": user,
        #                 "login_url": f"{settings.FRONTEND_URL}/login/",
        #                 "frontend_url": settings.FRONTEND_URL,
        #             },
        #         )
        #         # Create plain text version
        #         text_message = f"""
        # Welcome to Hasa Book Store!

        # Hello {user.first_name or user.username},

        # Thank you for joining Hasa Book Store! We're excited to have you as a {'author' if user.is_author else 'reader'} in our community.

        # {'As an author, you can:' if user.is_author else 'As a reader, you can:'}
        # {'✓ Publish and manage your books' if user.is_author else '✓ Access thousands of books'}
        # {'✓ Track your sales and earnings' if user.is_author else '✓ Create your personal library'}
        # {'✓ Engage with your readers' if user.is_author else '✓ Track your reading progress'}
        # {'✓ Access author analytics' if user.is_author else '✓ Connect with authors'}

        # To get started, visit: {settings.FRONTEND_URL}/login/

        # If you have any questions or need assistance, don't hesitate to contact our support team.

        # Happy Reading!
        # The Hasa Book Store Team
        #         """

        #         # Send both HTML and plain text versions
        #         send_mail(
        #             subject=subject,
        #             message=text_message,
        #             html_message=html_message,
        #             from_email=settings.DEFAULT_FROM_EMAIL,
        #             recipient_list=[user.email],
        #         )

        return Response(
            {
                "detail": "Registration successful! Please check your email.",
                "user": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )
