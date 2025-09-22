from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers

from api.models.data.news import News, NewsCategory
from api.serializers.data.news import NewsListSerializer, NewsDetailSerializer, NewsCategorySerializer, NewsSerializer
from .base import DataRootViewSet


class NewsCategoryViewSet(DataRootViewSet):
    serializer_class = NewsCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering = ['name']
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return NewsCategory.objects.filter(is_active=True)
        return NewsCategory.objects.all()


class NewsViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    filterset_fields = ['status', 'category', 'is_featured', 'author']
    ordering_fields = ['created_at', 'published_at', 'views', 'title']
    ordering = ['-created_at']
    lookup_field = 'pk'

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return News.objects.select_related('author', 'category').filter(status='published')
        return News.objects.select_related('author', 'category').all()
    
    def perform_create(self, serializer):
        # Get or create a default admin user
        from django.contrib.auth import get_user_model
        User = get_user_model()
        admin_user, _ = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@acn.com', 'is_staff': True, 'is_superuser': True}
        )
        serializer.save(author=admin_user)

    def get_serializer_class(self):
        if self.action == 'list':
            return NewsListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return NewsSerializer
        return NewsDetailSerializer

    @method_decorator(cache_page(60 * 15))
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
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)