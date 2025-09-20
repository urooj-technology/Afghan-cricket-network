from rest_framework import serializers
from api.models.data import *
from .base import DataRootSerializer


class NewsCategorySerializer(DataRootSerializer):
    class Meta:
        model = NewsCategory
        fields = '__all__'


class NewsListSerializer(DataRootSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = News
        fields = ['id', 'title', 'slug', 'excerpt', 'image', 'author_name', 
                 'category_name', 'status', 'is_featured', 'views', 
                 'published_at', 'created_at']


class NewsDetailSerializer(DataRootSerializer):
    author = serializers.StringRelatedField(read_only=True)
    category = NewsCategorySerializer(read_only=True)
    
    class Meta:
        model = News
        fields = '__all__'


class PlayerListSerializer(DataRootSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'slug', 'jersey_number', 'role', 'age', 
                 'photo', 'matches_played', 'runs_scored', 'wickets_taken',
                 'status', 'is_captain', 'is_vice_captain', 'is_featured']


class PlayerDetailSerializer(DataRootSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class TeamRankingSerializer(DataRootSerializer):
    class Meta:
        model = TeamRanking
        fields = '__all__'


class PlayerRankingSerializer(DataRootSerializer):
    player_name = serializers.CharField(source='player.name', read_only=True)
    
    class Meta:
        model = PlayerRanking
        fields = '__all__'


class EventListSerializer(DataRootSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    venue_name = serializers.CharField(source='venue.name', read_only=True)
    venue_city = serializers.CharField(source='venue.city', read_only=True)
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'slug', 'category_name', 'event_type',
                 'venue_name', 'venue_city', 'date', 'status', 'is_featured',
                 'is_published', 'image', 'ticket_price', 'is_free']


class EventDetailSerializer(DataRootSerializer):
    category = serializers.StringRelatedField(read_only=True)
    venue = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'


class MediaListSerializer(DataRootSerializer):
    media_category_name = serializers.CharField(source='media_category.name', read_only=True)
    
    class Meta:
        model = Media
        fields = ['id', 'title', 'slug', 'media_type', 'category',
                 'media_category_name', 'image', 'thumbnail', 'views',
                 'is_featured', 'is_published', 'created_at']


class MediaDetailSerializer(DataRootSerializer):
    media_category = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Media
        fields = '__all__'