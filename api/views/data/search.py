from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from api.models.data.news import News
from api.models.data.events import Event
from api.models.data.team import Player, TeamMember
from api.models.data.media import Media
from api.serializers.data.news import NewsSerializer
from api.serializers.data.events import EventListSerializer
from api.serializers.data.team import PlayerListSerializer, TeamMemberListSerializer
from api.serializers.data.media import MediaListSerializer

class GlobalSearchView(APIView):
    def get(self, request):
        query = request.GET.get('q', '')
        category = request.GET.get('category', 'all')
        
        if not query:
            return Response({'results': []}, status=status.HTTP_200_OK)
        
        results = []
        
        if category in ['all', 'news']:
            news = News.objects.filter(
                Q(title__icontains=query) | 
                Q(content__icontains=query) |
                Q(excerpt__icontains=query)
            ).select_related('author', 'category')[:5]
            
            for item in news:
                results.append({
                    'id': item.id,
                    'type': 'news',
                    'title': item.title,
                    'excerpt': item.excerpt,
                    'image': item.image.url if item.image else None,
                    'author': item.author.first_name or item.author.username,
                    'category': item.category.name,
                    'date': item.published_at or item.created_at,
                    'views': item.views,
                    'slug': item.slug,
                    'status': item.status,
                    'is_featured': item.is_featured
                })
        
        if category in ['all', 'events']:
            events = Event.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(venue__name__icontains=query) |
                Q(venue__city__icontains=query)
            ).select_related('venue', 'category')[:5]
            
            for item in events:
                results.append({
                    'id': item.id,
                    'type': 'events',
                    'title': item.title,
                    'description': item.description[:150] + '...' if len(item.description) > 150 else item.description,
                    'image': item.image.url if item.image else None,
                    'venue': f"{item.venue.name}, {item.venue.city}",
                    'date': item.date,
                    'status': item.status,
                    'event_type': item.event_type,
                    'slug': item.slug,
                    'is_free': item.is_free,
                    'ticket_price': str(item.ticket_price) if item.ticket_price else None
                })
        
        if category in ['all', 'players']:
            players = Player.objects.filter(
                Q(name__icontains=query) |
                Q(position__icontains=query) |
                Q(bio__icontains=query)
            )[:5]
            
            for item in players:
                results.append({
                    'id': item.id,
                    'type': 'players',
                    'title': item.name,
                    'description': item.bio[:150] + '...' if item.bio and len(item.bio) > 150 else item.bio,
                    'image': item.photo.url if item.photo else None,
                    'position': item.role,
                    'jersey_number': item.jersey_number,
                    'age': item.age,
                    'matches_played': item.matches_played,
                    'runs_scored': item.runs_scored,
                    'wickets_taken': item.wickets_taken,
                    'slug': item.slug,
                    'is_captain': item.is_captain
                })
        
        if category in ['all', 'team']:
            team_members = TeamMember.objects.filter(
                Q(name__icontains=query) |
                Q(bio__icontains=query)
            ).select_related('role')[:5]
            
            for item in team_members:
                results.append({
                    'id': item.id,
                    'type': 'team',
                    'title': item.name,
                    'description': item.bio[:150] + '...' if item.bio and len(item.bio) > 150 else item.bio,
                    'image': item.photo.url if item.photo else None,
                    'position': item.position,
                    'role': item.role.name if item.role else None,
                    'member_type': item.member_type,
                    'join_date': item.join_date,
                    'slug': item.slug,
                    'is_active': item.is_active
                })
        
        if category in ['all', 'media']:
            media = Media.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query)
            ).select_related('media_category')[:5]
            
            for item in media:
                results.append({
                    'id': item.id,
                    'type': 'media',
                    'title': item.title,
                    'description': item.description[:150] + '...' if item.description and len(item.description) > 150 else item.description,
                    'image': item.image.url if item.image else None,
                    'thumbnail': item.thumbnail.url if item.thumbnail else None,
                    'media_type': item.media_type,
                    'category': item.media_category.name if item.media_category else None,
                    'views': item.views,
                    'slug': item.slug,
                    'is_featured': item.is_featured
                })
        
        return Response({'results': results}, status=status.HTTP_200_OK)