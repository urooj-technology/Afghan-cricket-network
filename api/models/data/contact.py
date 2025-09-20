from django.db import models
from .base import BaseModel


class ContactCategory(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "Contact Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class Contact(BaseModel):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('closed', 'Closed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    name = models.CharField(max_length=100, db_index=True)
    email = models.EmailField(db_index=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=200, db_index=True)
    message = models.TextField()
    category = models.ForeignKey(ContactCategory, on_delete=models.CASCADE, blank=True, null=True, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', db_index=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium', db_index=True)
    
    # Admin fields
    admin_notes = models.TextField(blank=True, null=True)
    replied_at = models.DateTimeField(blank=True, null=True)
    reply_message = models.TextField(blank=True, null=True)
    
    # Tracking
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status', 'priority']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['email', 'status']),
        ]

    def __str__(self):
        return f"{self.name} - {self.subject}"

    @property
    def is_new(self):
        return self.status == 'new'

    @property
    def is_urgent(self):
        return self.priority == 'urgent'


class ContactInfo(BaseModel):
    TYPE_CHOICES = [
        ('office', 'Office'),
        ('emergency', 'Emergency'),
        ('media', 'Media'),
        ('general', 'General'),
    ]

    contact_type = models.CharField(max_length=20, choices=TYPE_CHOICES, db_index=True)
    title = models.CharField(max_length=100, db_index=True)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    office_hours = models.CharField(max_length=200, blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order', 'contact_type']
        indexes = [
            models.Index(fields=['order', 'contact_type']),
            models.Index(fields=['is_active', 'contact_type']),
        ]

    def __str__(self):
        return f"{self.get_contact_type_display()} - {self.title}"