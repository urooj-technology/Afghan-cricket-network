from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from api.models.data.events import Event, EventCategory, Venue
from api.serializers.data.events import EventListSerializer, EventDetailSerializer, EventCategorySerializer, VenueSerializer
from .base import DataRootViewSet


class EventCategoryViewSet(DataRootViewSet):
    serializer_class = EventCategorySerializer
    permission_classes = [AllowAny]
    ordering = ['name']
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return EventCategory.objects.filter(is_active=True)
        return EventCategory.objects.all()


class VenueViewSet(DataRootViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'city', 'country']
    ordering = ['name']


class EventViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'description']
    filterset_fields = ['status', 'event_type', 'category', 'venue', 'is_featured']
    ordering_fields = ['date', 'created_at', 'title']
    ordering = ['-date']

    def get_queryset(self):
        return Event.objects.select_related('category', 'venue').filter(
            is_published=True
        )

    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventDetailSerializer

    @method_decorator(cache_page(60 * 15))
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        queryset = self.get_queryset().filter(status='upcoming')[:10]
        serializer = EventListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        queryset = self.get_queryset().filter(is_featured=True)[:5]
        serializer = EventListSerializer(queryset, many=True)
        return Response(serializer.data)