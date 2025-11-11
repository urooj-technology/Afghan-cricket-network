from django.contrib import admin
from .models.data import (
    NewsCategory, News, EventCategory, Venue, Event,
    TeamRole, Player, TeamMember, RankingCategory,
    TeamRanking, PlayerRanking, GeneralRanking,
    MediaCategory, Media, MediaGallery,
    ContactCategory, Contact, ContactInfo,
    AboutTeam
)


# News Admin
@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'status', 'is_featured', 'views', 'created_at']
    list_filter = ['status', 'is_featured', 'category', 'created_at', 'author']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views']
    date_hierarchy = 'created_at'
    

# Events Admin
@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'country', 'capacity', 'created_at']
    list_filter = ['country', 'city', 'created_at']
    search_fields = ['name', 'city', 'address']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'venue', 'date', 'status', 'is_featured', 'registered_count']
    list_filter = ['status', 'event_type', 'is_featured', 'is_published', 'date']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date'


# Team Admin
@admin.register(TeamRole)
class TeamRoleAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name', 'jersey_number', 'role', 'age', 'matches_played', 'status', 'is_captain']
    list_filter = ['role', 'status', 'is_captain', 'is_vice_captain', 'is_featured']
    search_fields = ['name', 'position']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'member_type', 'is_active', 'join_date']
    list_filter = ['member_type', 'is_active', 'join_date']
    search_fields = ['name', 'position']
    prepopulated_fields = {'slug': ('name',)}


# Rankings Admin
@admin.register(RankingCategory)
class RankingCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(TeamRanking)
class TeamRankingAdmin(admin.ModelAdmin):
    list_display = ['team_name', 'format', 'rank', 'rating', 'points', 'matches_played']
    list_filter = ['format', 'is_published', 'created_at']
    search_fields = ['team_name']
    ordering = ['format', 'rank']


@admin.register(PlayerRanking)
class PlayerRankingAdmin(admin.ModelAdmin):
    list_display = ['player_name', 'category', 'format', 'rank', 'rating', 'country']
    list_filter = ['category', 'format', 'country', 'is_published']
    search_fields = ['player_name']
    ordering = ['category', 'format', 'rank']


@admin.register(GeneralRanking)
class GeneralRankingAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'rank', 'points', 'rating', 'is_published']
    list_filter = ['category', 'is_published', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['category', 'rank']


# Media Admin
@admin.register(MediaCategory)
class MediaCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'category', 'is_featured', 'views', 'is_published', 'created_at']
    list_filter = ['media_type', 'category', 'is_featured', 'is_published', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views', 'file_size']
    date_hierarchy = 'created_at'


@admin.register(MediaGallery)
class MediaGalleryAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_featured', 'is_published', 'order', 'created_at']
    list_filter = ['is_featured', 'is_published', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ['media_items']


# Contact Admin
@admin.register(ContactCategory)
class ContactCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'priority', 'created_at']
    list_filter = ['status', 'priority', 'category', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['ip_address', 'user_agent', 'created_at']
    date_hierarchy = 'created_at'


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['title', 'contact_type', 'phone', 'email', 'is_active', 'order']
    list_filter = ['contact_type', 'is_active', 'created_at']
    search_fields = ['title', 'address']
    ordering = ['order', 'contact_type']


# About Team Admin
@admin.register(AboutTeam)
class AboutTeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'position']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
