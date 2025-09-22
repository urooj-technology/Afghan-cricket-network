from rest_framework import serializers
from api.models.data.contact import Contact, ContactCategory, ContactInfo
from .base import DataRootSerializer


class ContactCategorySerializer(DataRootSerializer):
    class Meta:
        model = ContactCategory
        fields = '__all__'


class ContactListSerializer(DataRootSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'subject', 'category_name', 
                 'status', 'priority', 'created_at']


class ContactDetailSerializer(DataRootSerializer):
    category = ContactCategorySerializer(read_only=True)
    
    class Meta:
        model = Contact
        fields = '__all__'


class ContactInfoSerializer(DataRootSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'