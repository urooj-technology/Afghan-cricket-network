from django.db import models
from .base import BaseModel


class RankingCategory(BaseModel):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "Ranking Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['name', 'is_active']),
        ]

    def __str__(self):
        return self.name


class TeamRanking(BaseModel):
    FORMAT_CHOICES = [
        ('t20i', 'T20I'),
        ('odi', 'ODI'),
        ('test', 'Test'),
    ]

    team_name = models.CharField(max_length=100, db_index=True)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, db_index=True)
    rank = models.PositiveIntegerField(db_index=True)
    rating = models.PositiveIntegerField()
    points = models.PositiveIntegerField()
    matches_played = models.PositiveIntegerField(default=0)
    country_code = models.CharField(max_length=3, default='AFG', db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['format', 'rank']
        unique_together = ['format', 'rank']
        indexes = [
            models.Index(fields=['format', 'rank']),
            models.Index(fields=['is_published', 'format']),
            models.Index(fields=['country_code', 'format']),
        ]

    def __str__(self):
        return f"{self.team_name} - {self.get_format_display()} (#{self.rank})"


class PlayerRanking(BaseModel):
    CATEGORY_CHOICES = [
        ('batting', 'Batting'),
        ('bowling', 'Bowling'),
        ('all-rounder', 'All-rounder'),
    ]

    FORMAT_CHOICES = [
        ('t20i', 'T20I'),
        ('odi', 'ODI'),
        ('test', 'Test'),
    ]

    player = models.ForeignKey('api.Player', on_delete=models.CASCADE, blank=True, null=True, db_index=True)
    player_name = models.CharField(max_length=100, db_index=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, db_index=True)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, db_index=True)
    rank = models.PositiveIntegerField(db_index=True)
    rating = models.PositiveIntegerField()
    points = models.PositiveIntegerField(blank=True, null=True)
    wickets = models.PositiveIntegerField(blank=True, null=True)
    country = models.CharField(max_length=100, default='Afghanistan', db_index=True)
    is_published = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['category', 'format', 'rank']
        unique_together = ['category', 'format', 'rank']
        indexes = [
            models.Index(fields=['category', 'format', 'rank']),
            models.Index(fields=['is_published', 'category', 'format']),
            models.Index(fields=['player', 'category']),
            models.Index(fields=['country', 'category']),
        ]

    def __str__(self):
        return f"{self.player_name} - {self.get_category_display()} {self.get_format_display()} (#{self.rank})"


class GeneralRanking(BaseModel):
    CATEGORY_CHOICES = [
        ('team', 'Team'),
        ('player', 'Player'),
        ('batting', 'Batting'),
        ('bowling', 'Bowling'),
        ('all-rounder', 'All-rounder'),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, db_index=True)
    title = models.CharField(max_length=200, db_index=True)
    rank = models.PositiveIntegerField(db_index=True)
    points = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='rankings/', blank=True, null=True)
    is_published = models.BooleanField(default=True, db_index=True)

    class Meta:
        ordering = ['category', 'rank']
        unique_together = ['category', 'rank']
        indexes = [
            models.Index(fields=['category', 'rank']),
            models.Index(fields=['is_published', 'category']),
        ]

    def __str__(self):
        return f"{self.get_category_display()} - {self.title} (#{self.rank})"