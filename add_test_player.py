#!/usr/bin/env python
import os
import sys
import django
from django.utils.text import slugify
from datetime import date

# Add the project directory to the Python path
sys.path.append('/home/rahmdel/Desktop/Afghan-cricket-network')

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Setup Django
django.setup()

# Now import Django models
from api.models.data.team import Player

def create_test_player():
    # Create a test player with jersey number 64
    player_data = {
        'name': 'Mujeeb Ur Rahman',
        'role': 'bowler',
        'jersey_number': 64,
        'age': 23,
        'matches_played': 55,
        'runs_scored': 125,
        'wickets_taken': 85,
        'batting_average': 8.50,
        'bowling_average': 22.40,
        'strike_rate': 65.20,
        'join_date': date(2017, 1, 1),
        'is_featured': True,
        'status': 'active'
    }
    
    slug = slugify(player_data['name'])
    player, created = Player.objects.get_or_create(
        slug=slug,
        defaults=player_data
    )
    
    if created:
        print(f'Successfully created player: {player.name} with slug: {player.slug}')
    else:
        print(f'Player already exists: {player.name} with slug: {player.slug}')
    
    return player

if __name__ == '__main__':
    try:
        player = create_test_player()
        print(f'Player ID: {player.id}')
        print(f'Player Slug: {player.slug}')
        print(f'Jersey Number: {player.jersey_number}')
        
        # List all players
        print('\nAll players in database:')
        for p in Player.objects.all():
            print(f'- {p.name} (slug: {p.slug}, jersey: {p.jersey_number})')
            
    except Exception as e:
        print(f'Error: {e}')