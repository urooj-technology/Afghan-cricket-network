from django.db import models
from .base import BaseModel


class EventCategory(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "Event Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class Venue(BaseModel):
    name = models.CharField(max_length=200, db_index=True)
    city = models.CharField(max_length=100, db_index=True)
    country = models.CharField(max_length=100, default='Afghanistan', db_index=True)
    capacity = models.PositiveIntegerField(blank=True, null=True, db_index=True)
    address = models.TextField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    image = models.ImageField(upload_to='venues/', blank=True, null=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['city', 'country']),
        ]

    def __str__(self):
        return f"{self.name}, {self.city}"


class Event(BaseModel):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    TYPE_CHOICES = [
        ('international', 'International'),
        ('domestic', 'Domestic'),
        ('training', 'Training'),
        ('tournament', 'Tournament'),
        ('friendly', 'Friendly'),
    ]

    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField()
    category = models.ForeignKey(EventCategory, on_delete=models.CASCADE, db_index=True)
    event_type = models.CharField(max_length=20, choices=TYPE_CHOICES, db_index=True)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, db_index=True)
    date = models.DateTimeField(db_index=True)
    end_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming', db_index=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_free = models.BooleanField(default=False, db_index=True)
    max_capacity = models.PositiveIntegerField(blank=True, null=True)
    registered_count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['-date']
        indexes = [
            models.Index(fields=['-date']),
            models.Index(fields=['status', 'date']),
            models.Index(fields=['is_featured', 'is_published']),
            models.Index(fields=['event_type', 'status']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['venue', 'date']),
        ]

    def __str__(self):
        return self.title

    @property
    def is_full(self):
        if self.max_capacity:
            return self.registered_count >= self.max_capacity
        return False