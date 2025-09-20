from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Prefetch, Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers

from api.models.data import *
from api.serializers.data.serializers import *
from .base import DataRootViewSet


class NewsViewSet(DataRootViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    filterset_fields = ['status', 'category', 'is_featured', 'author']
    ordering_fields = ['created_at', 'published_at', 'views', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        return News.objects.select_related('author', 'category').filter(
            status='published' if self.action == 'list' else Q()
        )

    def get_serializer_class(self):
        if self.action == 'list':
            return NewsListSerializer
        return NewsDetailSerializer

    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    @method_decorator(vary_on_headers('Authorization'))
    @action(detail=False, methods=['get'])
    def featured(self, request):
        queryset = self.get_queryset().filter(is_featured=True)[:5]
        serializer = NewsListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popular(self, request):
        queryset = self.get_queryset().order_by('-views')[:10]
        serializer = NewsListSerializer(queryset, many=True)
        return Response(serializer.data)


class PlayerViewSet(DataRootViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'position']
    filterset_fields = ['role', 'status', 'is_captain', 'is_vice_captain', 'is_featured']
    ordering_fields = ['name', 'jersey_number', 'age', 'matches_played', 'runs_scored', 'wickets_taken']
    ordering = ['jersey_number', 'name']

    def get_queryset(self):
        return Player.objects.filter(status='active' if self.action == 'list' else Q())

    def get_serializer_class(self):
        if self.action == 'list':
            return PlayerListSerializer
        return PlayerDetailSerializer

    @method_decorator(cache_page(60 * 30))  # Cache for 30 minutes
    @action(detail=False, methods=['get'])
    def featured(self, request):
        queryset = self.get_queryset().filter(is_featured=True)
        serializer = PlayerListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def captains(self, request):
        queryset = self.get_queryset().filter(Q(is_captain=True) | Q(is_vice_captain=True))
        serializer = PlayerListSerializer(queryset, many=True)
        return Response(serializer.data)


class TeamRankingViewSet(DataRootViewSet):
    queryset = TeamRanking.objects.filter(is_published=True)
    serializer_class = TeamRankingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['format', 'country_code']
    ordering_fields = ['rank', 'rating', 'points']
    ordering = ['format', 'rank']

    @method_decorator(cache_page(60 * 60))  # Cache for 1 hour
    @action(detail=False, methods=['get'])
    def by_format(self, request):
        format_type = request.query_params.get('format', 't20i')
        queryset = self.get_queryset().filter(format=format_type)[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PlayerRankingViewSet(DataRootViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category', 'format', 'country']
    ordering_fields = ['rank', 'rating', 'points']
    ordering = ['category', 'format', 'rank']

    def get_queryset(self):
        return PlayerRanking.objects.select_related('player').filter(is_published=True)

    def get_serializer_class(self):
        return PlayerRankingSerializer

    @method_decorator(cache_page(60 * 60))  # Cache for 1 hour
    @action(detail=False, methods=['get'])
    def top_performers(self, request):
        category = request.query_params.get('category', 'batting')
        format_type = request.query_params.get('format', 't20i')
        queryset = self.get_queryset().filter(
            category=category, format=format_type
        )[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class EventViewSet(DataRootViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
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

    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
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


class MediaViewSet(DataRootViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'description']
    filterset_fields = ['media_type', 'category', 'media_category', 'is_featured']
    ordering_fields = ['created_at', 'views', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        return Media.objects.select_related('media_category').filter(
            is_published=True
        )

    def get_serializer_class(self):
        if self.action == 'list':
            return MediaListSerializer
        return MediaDetailSerializer

    @method_decorator(cache_page(60 * 30))  # Cache for 30 minutes
    @action(detail=False, methods=['get'])
    def featured(self, request):
        queryset = self.get_queryset().filter(is_featured=True)[:10]
        serializer = MediaListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        media_type = request.query_params.get('type', 'photo')
        queryset = self.get_queryset().filter(media_type=media_type)[:20]
        serializer = MediaListSerializer(queryset, many=True)
        return Response(serializer.data)