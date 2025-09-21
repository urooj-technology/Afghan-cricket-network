#!/usr/bin/env python3

import os
import sys
import django

# Add the project directory to Python path
sys.path.append('/home/rahmdel/Desktop/Afghan-cricket-network')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models.data.rankings import TeamRanking, PlayerRanking, RankingCategory
from api.models.data.team import Player

def populate_rankings():
    print("🏆 Populating Rankings Data...")
    
    # Create ranking categories
    categories = [
        {'name': 'Batting', 'slug': 'batting'},
        {'name': 'Bowling', 'slug': 'bowling'},
        {'name': 'All-rounder', 'slug': 'all-rounder'},
        {'name': 'Teams', 'slug': 'teams'},
    ]
    
    for cat_data in categories:
        category, created = RankingCategory.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"✅ Created ranking category: {category.name}")
    
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
        {'team_name': 'England', 'format': 'odi', 'rank': 3, 'rating': 105, 'points': 1050, 'matches_played': 42, 'country_code': 'ENG'},
        {'team_name': 'Australia', 'format': 'odi', 'rank': 2, 'rating': 110, 'points': 1100, 'matches_played': 39, 'country_code': 'AUS'},
        
        # Test Rankings
        {'team_name': 'Afghanistan', 'format': 'test', 'rank': 10, 'rating': 75, 'points': 750, 'matches_played': 8, 'country_code': 'AFG'},
        {'team_name': 'India', 'format': 'test', 'rank': 2, 'rating': 120, 'points': 1200, 'matches_played': 25, 'country_code': 'IND'},
        {'team_name': 'Pakistan', 'format': 'test', 'rank': 8, 'rating': 85, 'points': 850, 'matches_played': 20, 'country_code': 'PAK'},
        {'team_name': 'England', 'format': 'test', 'rank': 4, 'rating': 105, 'points': 1050, 'matches_played': 28, 'country_code': 'ENG'},
        {'team_name': 'Australia', 'format': 'test', 'rank': 1, 'rating': 125, 'points': 1250, 'matches_played': 30, 'country_code': 'AUS'},
    ]
    
    # Create team rankings
    for team_data in team_rankings_data:
        ranking, created = TeamRanking.objects.get_or_create(
            team_name=team_data['team_name'],
            format=team_data['format'],
            defaults=team_data
        )
        if created:
            print(f"✅ Created team ranking: {ranking.team_name} - {ranking.format} (#{ranking.rank})")
    
    # Player Rankings Data
    player_rankings_data = [
        # T20I Batting Rankings
        {'player_name': 'Rahmanullah Gurbaz', 'category': 'batting', 'format': 't20i', 'rank': 15, 'rating': 720, 'points': 720, 'country': 'Afghanistan'},
        {'player_name': 'Ibrahim Zadran', 'category': 'batting', 'format': 't20i', 'rank': 25, 'rating': 680, 'points': 680, 'country': 'Afghanistan'},
        {'player_name': 'Najibullah Zadran', 'category': 'batting', 'format': 't20i', 'rank': 35, 'rating': 650, 'points': 650, 'country': 'Afghanistan'},
        {'player_name': 'Babar Azam', 'category': 'batting', 'format': 't20i', 'rank': 1, 'rating': 850, 'points': 850, 'country': 'Pakistan'},
        {'player_name': 'Virat Kohli', 'category': 'batting', 'format': 't20i', 'rank': 5, 'rating': 800, 'points': 800, 'country': 'India'},
        
        # T20I Bowling Rankings
        {'player_name': 'Rashid Khan', 'category': 'bowling', 'format': 't20i', 'rank': 1, 'rating': 900, 'points': 900, 'wickets': 150, 'country': 'Afghanistan'},
        {'player_name': 'Mujeeb Ur Rahman', 'category': 'bowling', 'format': 't20i', 'rank': 8, 'rating': 780, 'points': 780, 'wickets': 85, 'country': 'Afghanistan'},
        {'player_name': 'Fazalhaq Farooqi', 'category': 'bowling', 'format': 't20i', 'rank': 12, 'rating': 750, 'points': 750, 'wickets': 65, 'country': 'Afghanistan'},
        {'player_name': 'Shaheen Afridi', 'category': 'bowling', 'format': 't20i', 'rank': 3, 'rating': 850, 'points': 850, 'wickets': 120, 'country': 'Pakistan'},
        {'player_name': 'Jasprit Bumrah', 'category': 'bowling', 'format': 't20i', 'rank': 2, 'rating': 870, 'points': 870, 'wickets': 140, 'country': 'India'},
        
        # T20I All-rounder Rankings
        {'player_name': 'Mohammad Nabi', 'category': 'all-rounder', 'format': 't20i', 'rank': 5, 'rating': 750, 'points': 750, 'wickets': 45, 'country': 'Afghanistan'},
        {'player_name': 'Gulbadin Naib', 'category': 'all-rounder', 'format': 't20i', 'rank': 15, 'rating': 650, 'points': 650, 'wickets': 25, 'country': 'Afghanistan'},
        {'player_name': 'Hardik Pandya', 'category': 'all-rounder', 'format': 't20i', 'rank': 2, 'rating': 820, 'points': 820, 'wickets': 35, 'country': 'India'},
        {'player_name': 'Shadab Khan', 'category': 'all-rounder', 'format': 't20i', 'rank': 8, 'rating': 720, 'points': 720, 'wickets': 40, 'country': 'Pakistan'},
        
        # ODI Rankings
        {'player_name': 'Hashmatullah Shahidi', 'category': 'batting', 'format': 'odi', 'rank': 20, 'rating': 680, 'points': 680, 'country': 'Afghanistan'},
        {'player_name': 'Rahmat Shah', 'category': 'batting', 'format': 'odi', 'rank': 25, 'rating': 650, 'points': 650, 'country': 'Afghanistan'},
        {'player_name': 'Rashid Khan', 'category': 'bowling', 'format': 'odi', 'rank': 2, 'rating': 850, 'points': 850, 'wickets': 180, 'country': 'Afghanistan'},
        {'player_name': 'Mohammad Nabi', 'category': 'all-rounder', 'format': 'odi', 'rank': 8, 'rating': 720, 'points': 720, 'wickets': 55, 'country': 'Afghanistan'},
        
        # Test Rankings
        {'player_name': 'Hashmatullah Shahidi', 'category': 'batting', 'format': 'test', 'rank': 35, 'rating': 600, 'points': 600, 'country': 'Afghanistan'},
        {'player_name': 'Rahmat Shah', 'category': 'batting', 'format': 'test', 'rank': 40, 'rating': 580, 'points': 580, 'country': 'Afghanistan'},
        {'player_name': 'Rashid Khan', 'category': 'bowling', 'format': 'test', 'rank': 15, 'rating': 750, 'points': 750, 'wickets': 45, 'country': 'Afghanistan'},
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
            print(f"✅ Created player ranking: {ranking.player_name} - {ranking.category} {ranking.format} (#{ranking.rank})")
    
    print(f"\n🎉 Rankings data population completed!")
    print(f"📊 Total Team Rankings: {TeamRanking.objects.count()}")
    print(f"👥 Total Player Rankings: {PlayerRanking.objects.count()}")
    print(f"📂 Total Ranking Categories: {RankingCategory.objects.count()}")

if __name__ == '__main__':
    populate_rankings()