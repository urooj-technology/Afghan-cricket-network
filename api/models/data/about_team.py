from django.db import models
from django.utils.text import slugify
from .base import BaseModel


class AboutTeam(BaseModel):
    """Team members displayed on About page"""
    
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    position = models.CharField(max_length=100, db_index=True)
    photo = models.ImageField(upload_to='about_team/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order', 'name']
        indexes = [
            models.Index(fields=['order', 'name']),
            models.Index(fields=['is_active']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.position}"
