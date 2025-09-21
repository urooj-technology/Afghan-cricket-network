from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.models.data.rankings import PlayerRanking, TeamRanking

@api_view(['GET'])
@permission_classes([AllowAny])
def test_rankings(request):
    """Test endpoint to verify rankings data"""
    player_count = PlayerRanking.objects.count()
    team_count = TeamRanking.objects.count()
    
    return Response({
        'status': 'success',
        'message': 'Rankings API is working',
        'data': {
            'player_rankings_count': player_count,
            'team_rankings_count': team_count,
            'available_categories': ['batting', 'bowling', 'all-rounder'],
            'available_formats': ['t20i', 'odi', 'test']
        }
    })