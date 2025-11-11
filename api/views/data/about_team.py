from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from api.models.data.about_team import AboutTeam
from api.serializers.data.about_team import AboutTeamSerializer
from .base import DataRootViewSet


class AboutTeamViewSet(DataRootViewSet):
    queryset = AboutTeam.objects.all()
    serializer_class = AboutTeamSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'position']
    ordering_fields = ['order', 'name', 'created_at']
    ordering = ['order', 'name']
