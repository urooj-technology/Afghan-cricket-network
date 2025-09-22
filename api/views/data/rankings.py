from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from api.models.data.rankings import TeamRanking, PlayerRanking, GeneralRanking, RankingCategory
from api.serializers.data.rankings import TeamRankingSerializer, PlayerRankingSerializer, GeneralRankingSerializer, RankingCategorySerializer
from .base import DataRootViewSet


class RankingCategoryViewSet(DataRootViewSet):
    serializer_class = RankingCategorySerializer
    permission_classes = [AllowAny]
    ordering = ['name']
    
    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return RankingCategory.objects.filter(is_active=True)
        return RankingCategory.objects.all()


class TeamRankingViewSet(DataRootViewSet):
    queryset = TeamRanking.objects.filter(is_published=True)
    serializer_class = TeamRankingSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['format', 'country_code', 'is_published']
    ordering_fields = ['rank', 'rating', 'points']
    ordering = ['format', 'rank']

    @action(detail=False, methods=['get'], url_path='by_format')
    def by_format(self, request):
        format_type = request.query_params.get('format', 't20i')
        queryset = self.get_queryset().filter(format=format_type)[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PlayerRankingViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category', 'format', 'country', 'is_published']
    ordering_fields = ['rank', 'rating', 'points']
    ordering = ['category', 'format', 'rank']

    def get_queryset(self):
        return PlayerRanking.objects.filter(is_published=True)

    def get_serializer_class(self):
        return PlayerRankingSerializer

    @action(detail=False, methods=['get'], url_path='top_performers')
    def top_performers(self, request):
        category = request.query_params.get('category', 'batting')
        format_type = request.query_params.get('format', 't20i')
        queryset = self.get_queryset().filter(
            category=category, format=format_type
        )[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GeneralRankingViewSet(DataRootViewSet):
    queryset = GeneralRanking.objects.filter(is_published=True)
    serializer_class = GeneralRankingSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['rank', 'rating', 'points']
    ordering = ['category', 'rank']