from django.core.management.base import BaseCommand
from api.models.data.rankings import TeamRanking, PlayerRanking, RankingCategory

class Command(BaseCommand):
    help = 'Populate rankings data'

    def handle(self, *args, **options):
        self.stdout.write("🏆 Populating Rankings Data...")
        
        # Team Rankings Data
        team_rankings_data = [
            # T20I Rankings
            {'team_name': 'Afghanistan', 'format': 't20i', 'rank': 10, 'rating': 250, 'points': 2500, 'matches_played': 45, 'country_code': 'AFG'},
            {'team_name': 'India', 'format': 't20i', 'rank': 1, 'rating': 268, 'points': 2680, 'matches_played': 50, 'country_code': 'IND'},
            {'team_name': 'Pakistan', 'format': 't20i', 'rank': 4, 'rating': 258, 'points': 2580, 'matches_played': 48, 'country_code': 'PAK'},
            {'team_name': 'England', 'format': 't20i', 'rank': 2, 'rating': 265, 'points': 2650, 'matches_played': 52, 'country_code': 'ENG'},
            {'team_name': 'Australia', 'format': 't20i', 'rank': 3, 'rating': 262, 'points': 2620, 'matches_played': 49, 'country_code': 'AUS'},
            
            # ODI Rankings
            {'team_name': 'Afghanistan', 'format': 'odi', 'rank': 13, 'rating': 85, 'points': 850, 'matches_played': 35, 'country_code': 'AFG'},
            {'team_name': 'India', 'format': 'odi', 'rank': 1, 'rating': 115, 'points': 1150, 'matches_played': 40, 'country_code': 'IND'},
            {'team_name': 'Pakistan', 'format': 'odi', 'rank': 5, 'rating': 95, 'points': 950, 'matches_played': 38, 'country_code': 'PAK'},
            
            # Test Rankings
            {'team_name': 'Afghanistan', 'format': 'test', 'rank': 10, 'rating': 75, 'points': 750, 'matches_played': 8, 'country_code': 'AFG'},
            {'team_name': 'India', 'format': 'test', 'rank': 2, 'rating': 120, 'points': 1200, 'matches_played': 25, 'country_code': 'IND'},
        ]
        
        # Create team rankings
        for team_data in team_rankings_data:
            ranking, created = TeamRanking.objects.get_or_create(
                team_name=team_data['team_name'],
                format=team_data['format'],
                defaults=team_data
            )
            if created:
                self.stdout.write(f"✅ Created team ranking: {ranking.team_name} - {ranking.format} (#{ranking.rank})")
        
        # Player Rankings Data
        player_rankings_data = [
            # T20I Batting Rankings
            {'player_name': 'Rahmanullah Gurbaz', 'category': 'batting', 'format': 't20i', 'rank': 15, 'rating': 720, 'points': 720, 'country': 'Afghanistan'},
            {'player_name': 'Ibrahim Zadran', 'category': 'batting', 'format': 't20i', 'rank': 25, 'rating': 680, 'points': 680, 'country': 'Afghanistan'},
            {'player_name': 'Babar Azam', 'category': 'batting', 'format': 't20i', 'rank': 1, 'rating': 850, 'points': 850, 'country': 'Pakistan'},
            
            # T20I Bowling Rankings
            {'player_name': 'Rashid Khan', 'category': 'bowling', 'format': 't20i', 'rank': 1, 'rating': 900, 'points': 900, 'wickets': 150, 'country': 'Afghanistan'},
            {'player_name': 'Mujeeb Ur Rahman', 'category': 'bowling', 'format': 't20i', 'rank': 8, 'rating': 780, 'points': 780, 'wickets': 85, 'country': 'Afghanistan'},
            {'player_name': 'Fazalhaq Farooqi', 'category': 'bowling', 'format': 't20i', 'rank': 12, 'rating': 750, 'points': 750, 'wickets': 65, 'country': 'Afghanistan'},
            
            # T20I All-rounder Rankings
            {'player_name': 'Mohammad Nabi', 'category': 'all-rounder', 'format': 't20i', 'rank': 5, 'rating': 750, 'points': 750, 'wickets': 45, 'country': 'Afghanistan'},
            {'player_name': 'Gulbadin Naib', 'category': 'all-rounder', 'format': 't20i', 'rank': 15, 'rating': 650, 'points': 650, 'wickets': 25, 'country': 'Afghanistan'},
        ]
        
        # Create player rankings
        for player_data in player_rankings_data:
            ranking, created = PlayerRanking.objects.get_or_create(
                player_name=player_data['player_name'],
                category=player_data['category'],
                format=player_data['format'],
                defaults=player_data
            )
            if created:
                self.stdout.write(f"✅ Created player ranking: {ranking.player_name} - {ranking.category} {ranking.format} (#{ranking.rank})")
        
        self.stdout.write(f"\n🎉 Rankings data population completed!")
        self.stdout.write(f"📊 Total Team Rankings: {TeamRanking.objects.count()}")
        self.stdout.write(f"👥 Total Player Rankings: {PlayerRanking.objects.count()}")