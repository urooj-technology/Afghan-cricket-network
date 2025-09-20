from django.db import models
from django.contrib.auth import get_user_model
from .data.base import BaseModel

User = get_user_model()


class News(BaseModel):
    title = models.CharField(max_length=200)
    title_ps = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField()
    content_ps = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "News"
    
    def __str__(self):
        return self.title


class Event(BaseModel):
    title = models.CharField(max_length=200)
    title_ps = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField()
    description_ps = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    location_ps = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title


class Player(BaseModel):
    name = models.CharField(max_length=100)
    name_ps = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=50)
    position_ps = models.CharField(max_length=50, blank=True, null=True)
    jersey_number = models.IntegerField(unique=True)
    photo = models.ImageField(upload_to='players/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    bio_ps = models.TextField(blank=True, null=True)
    matches_played = models.IntegerField(default=0)
    runs_scored = models.IntegerField(default=0)
    wickets_taken = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['jersey_number']
    
    def __str__(self):
        return f"{self.name} (#{self.jersey_number})"


class Ranking(BaseModel):
    CATEGORY_CHOICES = [
        ('team', 'Team'),
        ('player', 'Player'),
        ('batting', 'Batting'),
        ('bowling', 'Bowling'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=200)
    title_ps = models.CharField(max_length=200, blank=True, null=True)
    position = models.IntegerField()
    points = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    description_ps = models.TextField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['category', 'position']
        unique_together = ['category', 'position']
    
    def __str__(self):
        return f"{self.get_category_display()} - {self.title} (#{self.position})"


class Media(BaseModel):
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('gallery', 'Gallery'),
    ]
    
    title = models.CharField(max_length=200)
    title_ps = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    description_ps = models.TextField(blank=True, null=True)
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='media/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='media/thumbnails/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Media"
    
    def __str__(self):
        return f"{self.title} ({self.get_media_type_display()})"


class Contact(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"