from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count, Avg, Max, Sum
from datetime import datetime, timedelta

from api.models.data.team import Player
from api.models.data.events import Event
from api.models.data.rankings import TeamRanking, PlayerRanking
from .base import DataRootViewSet


class CricketStatsViewSet(DataRootViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'], url_path='home_stats')
    def home_stats(self, request):
        """Get key cricket statistics for home page"""
        
        # Team performance stats
        team_stats = {
            'current_ranking': {
                't20i': TeamRanking.objects.filter(format='t20i', country_code='AFG').first(),
                'odi': TeamRanking.objects.filter(format='odi', country_code='AFG').first(),
                'test': TeamRanking.objects.filter(format='test', country_code='AFG').first(),
            }
        }
        
        # Player achievements
        top_performers = {
            'leading_run_scorer': Player.objects.filter(status='active').order_by('-runs_scored').first(),
            'leading_wicket_taker': Player.objects.filter(status='active').order_by('-wickets_taken').first(),
            'highest_average': Player.objects.filter(status='active', matches_played__gte=10).order_by('-batting_average').first(),
            'best_strike_rate': Player.objects.filter(status='active', matches_played__gte=10).order_by('-strike_rate').first(),
        }
        
        # Recent achievements
        recent_rankings = PlayerRanking.objects.filter(
            country='Afghanistan',
            is_published=True
        ).order_by('rank')[:5]
        
        # Upcoming matches
        upcoming_matches = Event.objects.filter(
            status='upcoming',
            event_type__in=['international', 'tournament'],
            date__gte=datetime.now(),
            is_published=True
        ).order_by('date')[:3]
        
        # Team composition
        team_composition = {
            'total_players': Player.objects.filter(status='active').count(),
            'by_role': {
                role[0]: Player.objects.filter(status='active', role=role[0]).count()
                for role in Player.PLAYER_ROLE_CHOICES
            }
        }
        
        # Format team rankings data
        formatted_team_stats = {}
        for format_key, ranking in team_stats['current_ranking'].items():
            if ranking:
                formatted_team_stats[format_key] = {
                    'rank': ranking.rank,
                    'rating': ranking.rating,
                    'points': ranking.points,
                    'matches_played': ranking.matches_played
                }
            else:
                formatted_team_stats[format_key] = None
        
        # Format player data
        formatted_players = {}
        for key, player in top_performers.items():
            if player:
                formatted_players[key] = {
                    'name': player.name,
                    'jersey_number': player.jersey_number,
                    'role': player.get_role_display(),
                    'runs_scored': player.runs_scored,
                    'wickets_taken': player.wickets_taken,
                    'batting_average': float(player.batting_average),
                    'strike_rate': float(player.strike_rate),
                    'matches_played': player.matches_played
                }
            else:
                formatted_players[key] = None
        
        # Format rankings data
        formatted_rankings = []
        for ranking in recent_rankings:
            formatted_rankings.append({
                'player_name': ranking.player_name,
                'category': ranking.get_category_display(),
                'format': ranking.get_format_display(),
                'rank': ranking.rank,
                'rating': ranking.rating
            })
        
        # Format upcoming matches
        formatted_matches = []
        for match in upcoming_matches:
            formatted_matches.append({
                'title': match.title,
                'date': match.date,
                'venue': {
                    'name': match.venue.name,
                    'city': match.venue.city,
                    'country': match.venue.country
                },
                'event_type': match.get_event_type_display(),
                'status': match.get_status_display()
            })
        
        return Response({
            'team_rankings': formatted_team_stats,
            'top_performers': formatted_players,
            'recent_player_rankings': formatted_rankings,
            'upcoming_matches': formatted_matches,
            'team_composition': team_composition,
            'last_updated': datetime.now().isoformat()
        })