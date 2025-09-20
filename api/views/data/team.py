from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from api.models.data.team import Player, TeamMember, TeamRole
from api.serializers.data.team import PlayerListSerializer, PlayerDetailSerializer, TeamMemberListSerializer, TeamMemberDetailSerializer, TeamRoleSerializer
from .base import DataRootViewSet


class TeamRoleViewSet(DataRootViewSet):
    queryset = TeamRole.objects.filter(is_active=True)
    serializer_class = TeamRoleSerializer
    permission_classes = [AllowAny]
    ordering = ['name']


class PlayerViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
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

    @method_decorator(cache_page(60 * 30))
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


class TeamMemberViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'position']
    filterset_fields = ['member_type', 'role', 'is_active']
    ordering_fields = ['order', 'name', 'join_date']
    ordering = ['member_type', 'order', 'name']

    def get_queryset(self):
        return TeamMember.objects.select_related('role').filter(is_active=True)

    def get_serializer_class(self):
        if self.action == 'list':
            return TeamMemberListSerializer
        return TeamMemberDetailSerializer