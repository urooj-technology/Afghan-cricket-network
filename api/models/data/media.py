from django.db import models
from .base import BaseModel


class MediaCategory(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "Media Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class Media(BaseModel):
    TYPE_CHOICES = [
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('gallery', 'Gallery'),
        ('document', 'Document'),
    ]

    CATEGORY_CHOICES = [
        ('matches', 'Matches'),
        ('events', 'Events'),
        ('training', 'Training'),
        ('awards', 'Awards'),
        ('behind_scenes', 'Behind the Scenes'),
        ('interviews', 'Interviews'),
    ]

    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField(blank=True, null=True)
    media_type = models.CharField(max_length=20, choices=TYPE_CHOICES, db_index=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, db_index=True)
    media_category = models.ForeignKey(MediaCategory, on_delete=models.CASCADE, blank=True, null=True, db_index=True)
    
    # File fields
    file = models.FileField(upload_to='media/files/', blank=True, null=True)
    image = models.ImageField(upload_to='media/images/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='media/thumbnails/', blank=True, null=True)
    
    # External links
    url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    
    # Metadata
    file_size = models.PositiveIntegerField(blank=True, null=True, help_text="File size in bytes")
    duration = models.DurationField(blank=True, null=True, help_text="For video/audio files")
    views = models.PositiveIntegerField(default=0, db_index=True)
    
    # Publishing
    is_featured = models.BooleanField(default=False, db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)
    published_at = models.DateTimeField(blank=True, null=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Media"
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['media_type', 'is_published']),
            models.Index(fields=['category', 'is_published']),
            models.Index(fields=['is_featured', 'is_published']),
            models.Index(fields=['-views']),
            models.Index(fields=['-published_at']),
        ]

    def __str__(self):
        return f"{self.title} ({self.get_media_type_display()})"


class MediaGallery(BaseModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='galleries/', blank=True, null=True)
    media_items = models.ManyToManyField(Media, blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Media Galleries"

    def __str__(self):
        return self.name

    @property
    def item_count(self):
        return self.media_items.count()