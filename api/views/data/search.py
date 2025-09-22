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
        
        results = {}
        
        if category in ['all', 'news']:
            news = News.objects.filter(
                Q(title__icontains=query) | 
                Q(content__icontains=query) |
                Q(summary__icontains=query)
            )[:5]
            results['news'] = NewsSerializer(news, many=True).data
        
        if category in ['all', 'events']:
            events = Event.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(location__icontains=query)
            )[:5]
            results['events'] = EventListSerializer(events, many=True).data
        
        if category in ['all', 'players']:
            players = Player.objects.filter(
                Q(name__icontains=query) |
                Q(position__icontains=query) |
                Q(bio__icontains=query)
            )[:5]
            results['players'] = PlayerListSerializer(players, many=True).data
        
        if category in ['all', 'team']:
            team_members = TeamMember.objects.filter(
                Q(name__icontains=query) |
                Q(bio__icontains=query)
            )[:5]
            results['team'] = TeamMemberListSerializer(team_members, many=True).data
        
        if category in ['all', 'media']:
            media = Media.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query)
            )[:5]
            results['media'] = MediaListSerializer(media, many=True).data
        
        return Response({'results': results}, status=status.HTTP_200_OK)