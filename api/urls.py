from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.data.viewsets import (
    NewsViewSet, NewsCategoryViewSet,
    EventViewSet, EventCategoryViewSet, VenueViewSet,
    PlayerViewSet, TeamMemberViewSet, TeamRoleViewSet,
    TeamRankingViewSet, PlayerRankingViewSet, GeneralRankingViewSet, RankingCategoryViewSet,
    MediaViewSet, MediaCategoryViewSet, MediaGalleryViewSet
)


# Create router for API endpoints
router = DefaultRouter()

# News endpoints
router.register(r'news', NewsViewSet, basename='news')
router.register(r'news-categories', NewsCategoryViewSet, basename='news-categories')

# Events endpoints
router.register(r'events', EventViewSet, basename='events')
router.register(r'event-categories', EventCategoryViewSet, basename='event-categories')
router.register(r'venues', VenueViewSet, basename='venues')

# Team endpoints
router.register(r'players', PlayerViewSet, basename='players')
router.register(r'team-members', TeamMemberViewSet, basename='team-members')
router.register(r'team-roles', TeamRoleViewSet, basename='team-roles')

# Rankings endpoints
router.register(r'team-rankings', TeamRankingViewSet, basename='team-rankings')
router.register(r'player-rankings', PlayerRankingViewSet, basename='player-rankings')
router.register(r'general-rankings', GeneralRankingViewSet, basename='general-rankings')
router.register(r'ranking-categories', RankingCategoryViewSet, basename='ranking-categories')

# Media endpoints
router.register(r'media', MediaViewSet, basename='media')
router.register(r'media-categories', MediaCategoryViewSet, basename='media-categories')
router.register(r'media-galleries', MediaGalleryViewSet, basename='media-galleries')

urlpatterns = [
    path('v1/', include(router.urls)),
]