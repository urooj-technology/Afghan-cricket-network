from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models.data import *
from datetime import datetime, timedelta
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Create sample data for Afghan Cricket Network'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create superuser if not exists
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write('Created superuser: admin/admin123')
        
        admin_user = User.objects.filter(is_superuser=True).first()
        
        # Create News Categories
        news_categories = [
            {'name': 'Match Reports', 'slug': 'match-reports'},
            {'name': 'Team News', 'slug': 'team-news'},
            {'name': 'Infrastructure', 'slug': 'infrastructure'},
        ]
        
        for cat_data in news_categories:
            NewsCategory.objects.get_or_create(slug=cat_data['slug'], defaults=cat_data)
        
        # Create Event Categories
        event_categories = [
            {'name': 'International Matches', 'slug': 'international-matches'},
            {'name': 'Training Camps', 'slug': 'training-camps'},
            {'name': 'Tournaments', 'slug': 'tournaments'},
        ]
        
        for cat_data in event_categories:
            EventCategory.objects.get_or_create(slug=cat_data['slug'], defaults=cat_data)
        
        # Create Venues
        venues = [
            {'name': 'Sharjah Cricket Stadium', 'city': 'Sharjah', 'country': 'UAE', 'capacity': 15000},
            {'name': 'Kabul Cricket Ground', 'city': 'Kabul', 'country': 'Afghanistan', 'capacity': 8000},
            {'name': 'Kandahar Stadium', 'city': 'Kandahar', 'country': 'Afghanistan', 'capacity': 6000},
        ]
        
        for venue_data in venues:
            Venue.objects.get_or_create(name=venue_data['name'], defaults=venue_data)
        
        # Create Team Roles
        team_roles = [
            {'name': 'Captain'},
            {'name': 'Coach'},
            {'name': 'Manager'},
        ]
        
        for role_data in team_roles:
            TeamRole.objects.get_or_create(name=role_data['name'], defaults=role_data)
        
        # Create Media Categories
        media_categories = [
            {'name': 'Match Highlights', 'slug': 'match-highlights'},
            {'name': 'Training Sessions', 'slug': 'training-sessions'},
            {'name': 'Interviews', 'slug': 'interviews'},
        ]
        
        for cat_data in media_categories:
            MediaCategory.objects.get_or_create(slug=cat_data['slug'], defaults=cat_data)
        
        # Create Contact Categories
        contact_categories = [
            {'name': 'General Inquiry'},
            {'name': 'Media Request'},
            {'name': 'Partnership'},
        ]
        
        for cat_data in contact_categories:
            ContactCategory.objects.get_or_create(name=cat_data['name'], defaults=cat_data)
        
        # Create sample players
        players_data = [
            {
                'name': 'Rashid Khan', 'jersey_number': 19,
                'role': 'all-rounder', 'age': 25, 'matches_played': 85,
                'runs_scored': 1200, 'wickets_taken': 145, 'batting_average': 18.50,
                'bowling_average': 15.20, 'is_captain': True, 'slug': 'rashid-khan'
            },
            {
                'name': 'Mohammad Nabi', 'jersey_number': 10,
                'role': 'all-rounder', 'age': 38, 'matches_played': 144,
                'runs_scored': 2500, 'wickets_taken': 89, 'batting_average': 25.20,
                'bowling_average': 28.50, 'slug': 'mohammad-nabi'
            },
            {
                'name': 'Rahmanullah Gurbaz', 'jersey_number': 1,
                'role': 'wicket-keeper', 'age': 22, 'matches_played': 45,
                'runs_scored': 1800, 'wickets_taken': 0, 'batting_average': 32.80,
                'slug': 'rahmanullah-gurbaz'
            },
        ]
        
        for player_data in players_data:
            player_data['join_date'] = datetime.now().date() - timedelta(days=random.randint(365, 2000))
            Player.objects.get_or_create(slug=player_data['slug'], defaults=player_data)
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))