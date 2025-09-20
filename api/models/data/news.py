from django.db import models
from django.contrib.auth import get_user_model
from .base import BaseModel

User = get_user_model()


class NewsCategory(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "News Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class News(BaseModel):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    excerpt = models.TextField(max_length=500)
    content = models.TextField()
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    category = models.ForeignKey(NewsCategory, on_delete=models.CASCADE, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft', db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    views = models.PositiveIntegerField(default=0, db_index=True)
    published_at = models.DateTimeField(blank=True, null=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "News"
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status', '-published_at']),
            models.Index(fields=['is_featured', 'status']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['author', 'status']),
            models.Index(fields=['-views']),
        ]

    def __str__(self):
        return self.title