from rest_framework import serializers
from api.models.data.events import Event, EventCategory, Venue
from .base import DataRootSerializer


class EventCategorySerializer(DataRootSerializer):
    class Meta:
        model = EventCategory
        fields = '__all__'


class VenueSerializer(DataRootSerializer):
    class Meta:
        model = Venue
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
    category = EventCategorySerializer(read_only=True)
    venue = VenueSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'