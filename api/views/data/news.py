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
from api.serializers.data.news import NewsListSerializer, NewsDetailSerializer, NewsCategorySerializer
from .base import DataRootViewSet


class NewsCategoryViewSet(DataRootViewSet):
    queryset = NewsCategory.objects.filter(is_active=True)
    serializer_class = NewsCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering = ['name']


class NewsViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
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