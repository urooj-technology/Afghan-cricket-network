from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from api.models.data.media import Media, MediaCategory, MediaGallery
from api.serializers.data.media import MediaListSerializer, MediaDetailSerializer, MediaCategorySerializer, MediaGallerySerializer
from .base import DataRootViewSet


class MediaCategoryViewSet(DataRootViewSet):
    serializer_class = MediaCategorySerializer
    permission_classes = [AllowAny]
    ordering = ['name']
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return MediaCategory.objects.filter(is_active=True)
        return MediaCategory.objects.all()


class MediaViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'description']
    filterset_fields = ['media_type', 'category', 'media_category', 'is_featured']
    ordering_fields = ['created_at', 'views', 'title']
    ordering = ['-created_at']
    lookup_field = 'pk'

    def get_queryset(self):
        return Media.objects.select_related('media_category').filter(
            is_published=True
        )

    def get_serializer_class(self):
        if self.action == 'list':
            return MediaListSerializer
        return MediaDetailSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @method_decorator(cache_page(60 * 30))
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


class MediaGalleryViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'created_at', 'name']
    ordering = ['order', '-created_at']
    lookup_field = 'pk'

    def get_queryset(self):
        return MediaGallery.objects.prefetch_related('media_items').filter(
            is_published=True
        )

    def get_serializer_class(self):
        return MediaGallerySerializer