from django.db import models
from django.utils.text import slugify
from .base import BaseModel


class TeamRole(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class Player(BaseModel):
    PLAYER_ROLE_CHOICES = [
        ('batsman', 'Batsman'),
        ('bowler', 'Bowler'),
        ('all-rounder', 'All-rounder'),
        ('wicket-keeper', 'Wicket-keeper'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('injured', 'Injured'),
        ('retired', 'Retired'),
        ('suspended', 'Suspended'),
    ]

    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    jersey_number = models.PositiveIntegerField(unique=True, blank=True, null=True, db_index=True)
    role = models.CharField(max_length=20, choices=PLAYER_ROLE_CHOICES, db_index=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    age = models.PositiveIntegerField(db_index=True)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='players/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    # Cricket Statistics
    matches_played = models.PositiveIntegerField(default=0, db_index=True)
    runs_scored = models.PositiveIntegerField(default=0, db_index=True)
    wickets_taken = models.PositiveIntegerField(default=0, db_index=True)
    batting_average = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    bowling_average = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    strike_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    
    # Career Info
    debut_date = models.DateField(blank=True, null=True)
    join_date = models.DateField(db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', db_index=True)
    is_captain = models.BooleanField(default=False, db_index=True)
    is_vice_captain = models.BooleanField(default=False, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['jersey_number', 'name']
        indexes = [
            models.Index(fields=['jersey_number', 'name']),
            models.Index(fields=['role', 'status']),
            models.Index(fields=['is_featured', 'status']),
            models.Index(fields=['is_captain', 'is_vice_captain']),
            models.Index(fields=['-matches_played']),
            models.Index(fields=['-runs_scored']),
            models.Index(fields=['-wickets_taken']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.jersey_number:
            return f"{self.name} (#{self.jersey_number})"
        return self.name


class TeamMember(BaseModel):
    MEMBER_TYPE_CHOICES = [
        ('management', 'Management'),
        ('coaches', 'Coaches'),
        ('staff', 'Staff'),
        ('players', 'Players'),
    ]

    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    position = models.CharField(max_length=100, db_index=True)
    member_type = models.CharField(max_length=20, choices=MEMBER_TYPE_CHOICES, db_index=True)
    role = models.ForeignKey(TeamRole, on_delete=models.CASCADE, blank=True, null=True, db_index=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    join_date = models.DateField(db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['member_type', 'order', 'name']
        indexes = [
            models.Index(fields=['member_type', 'order', 'name']),
            models.Index(fields=['is_active', 'member_type']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.position}"