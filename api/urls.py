from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.data.viewsets import (
    NewsViewSet, PlayerViewSet, TeamRankingViewSet, 
    PlayerRankingViewSet, EventViewSet, MediaViewSet
)

# Create router for API endpoints
router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'players', PlayerViewSet, basename='players')
router.register(r'team-rankings', TeamRankingViewSet, basename='team-rankings')
router.register(r'player-rankings', PlayerRankingViewSet, basename='player-rankings')
router.register(r'events', EventViewSet, basename='events')
router.register(r'media', MediaViewSet, basename='media')

urlpatterns = [
    path('v1/', include(router.urls)),
]