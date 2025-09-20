from account.models import User
from api.serializers.base import DataRootSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _


class UserSerializer(DataRootSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LoginSerializer(DataRootSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["email", "password"]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                msg = "Invalid credentials"
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(DataRootSerializer):
    current_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    new_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["current_password", "new_password"]

    def validate_new_password(self, value):
        validate_password(value)
        return value


class PasswordResetSerializer(DataRootSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ["email"]


class VerifyOTPSerializer(DataRootSerializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True, max_length=6)
    new_password = serializers.CharField(
        required=True, write_only=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["email", "otp", "new_password"]

    def validate_new_password(self, value):
        validate_password(value)
        return value


class RegisterSerializer(DataRootSerializer):
    password = serializers.CharField(write_only=True, required=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone",
            "profile_picture",
            "is_buyer",
            "is_seller",
            "is_finance"
        ]
        extra_kwargs = {
            "profile_picture": {"required": False},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
