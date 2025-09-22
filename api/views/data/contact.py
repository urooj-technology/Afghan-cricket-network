from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from api.models.data.contact import Contact, ContactCategory, ContactInfo
from api.serializers.data.contact import ContactListSerializer, ContactDetailSerializer, ContactCategorySerializer, ContactInfoSerializer
from .base import DataRootViewSet


class ContactCategoryViewSet(DataRootViewSet):
    serializer_class = ContactCategorySerializer
    permission_classes = [AllowAny]
    ordering = ['name']
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return ContactCategory.objects.filter(is_active=True)
        return ContactCategory.objects.all()


class ContactViewSet(DataRootViewSet):
    queryset = Contact.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'email', 'subject', 'message']
    filterset_fields = ['status', 'priority', 'category']
    ordering_fields = ['created_at', 'name', 'status', 'priority']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return ContactListSerializer
        return ContactDetailSerializer


class ContactInfoViewSet(DataRootViewSet):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]
    ordering = ['order', 'contact_type']