from django.core.management.base import BaseCommand
from api.models.data.rankings import PlayerRanking

class Command(BaseCommand):
    help = 'Populate player rankings with sample data'

    def handle(self, *args, **options):
        # Clear existing data
        PlayerRanking.objects.all().delete()
        
        # Batting rankings
        batting_players = [
            {'name': 'Rahmanullah Gurbaz', 'rating': 900, 'points': 900},
            {'name': 'Hashmatullah Shahidi', 'rating': 850, 'points': 850},
            {'name': 'Ibrahim Zadran', 'rating': 800, 'points': 800},
            {'name': 'Usman Ghani', 'rating': 750, 'points': 750},
            {'name': 'Najibullah Zadran', 'rating': 720, 'points': 720},
        ]
        
        # Bowling rankings
        bowling_players = [
            {'name': 'Rashid Khan', 'rating': 950, 'wickets': 150},
            {'name': 'Mujeeb Ur Rahman', 'rating': 880, 'wickets': 120},
            {'name': 'Fazalhaq Farooqi', 'rating': 820, 'wickets': 95},
            {'name': 'Naveen-ul-Haq', 'rating': 780, 'wickets': 85},
            {'name': 'Qais Ahmad', 'rating': 750, 'wickets': 75},
        ]
        
        # All-rounder rankings
        allrounder_players = [
            {'name': 'Mohammad Nabi', 'rating': 900, 'points': 900, 'wickets': 80},
            {'name': 'Gulbadin Naib', 'rating': 850, 'points': 850, 'wickets': 65},
            {'name': 'Azmatullah Omarzai', 'rating': 800, 'points': 800, 'wickets': 45},
            {'name': 'Karim Janat', 'rating': 750, 'points': 750, 'wickets': 35},
            {'name': 'Asghar Afghan', 'rating': 720, 'points': 720, 'wickets': 30},
        ]
        
        formats = ['t20i', 'odi', 'test']
        
        # Create batting rankings
        for format_type in formats:
            for rank, player in enumerate(batting_players, 1):
                PlayerRanking.objects.create(
                    player_name=player['name'],
                    category='batting',
                    format=format_type,
                    rank=rank,
                    rating=player['rating'],
                    points=player['points'],
                    country='Afghanistan',
                    is_published=True
                )
        
        # Create bowling rankings
        for format_type in formats:
            for rank, player in enumerate(bowling_players, 1):
                PlayerRanking.objects.create(
                    player_name=player['name'],
                    category='bowling',
                    format=format_type,
                    rank=rank,
                    rating=player['rating'],
                    wickets=player['wickets'],
                    country='Afghanistan',
                    is_published=True
                )
        
        # Create all-rounder rankings
        for format_type in formats:
            for rank, player in enumerate(allrounder_players, 1):
                PlayerRanking.objects.create(
                    player_name=player['name'],
                    category='all-rounder',
                    format=format_type,
                    rank=rank,
                    rating=player['rating'],
                    points=player['points'],
                    wickets=player['wickets'],
                    country='Afghanistan',
                    is_published=True
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {PlayerRanking.objects.count()} player rankings'
            )
        )