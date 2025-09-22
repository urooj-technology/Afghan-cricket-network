from django.core.management.base import BaseCommand
from django.utils.text import slugify
from api.models.data.team import Player
from datetime import date

class Command(BaseCommand):
    help = 'Create test players with proper slugs'

    def handle(self, *args, **options):
        players_data = [
            {
                'name': 'Rashid Khan',
                'role': 'all-rounder',
                'jersey_number': 19,
                'age': 25,
                'matches_played': 85,
                'runs_scored': 1250,
                'wickets_taken': 145,
                'batting_average': 18.50,
                'bowling_average': 20.25,
                'strike_rate': 125.30,
                'join_date': date(2015, 1, 1),
                'is_captain': True,
                'is_featured': True,
                'status': 'active'
            },
            {
                'name': 'Mohammad Nabi',
                'role': 'all-rounder',
                'jersey_number': 10,
                'age': 38,
                'matches_played': 120,
                'runs_scored': 2850,
                'wickets_taken': 95,
                'batting_average': 28.50,
                'bowling_average': 32.15,
                'strike_rate': 115.20,
                'join_date': date(2009, 1, 1),
                'is_vice_captain': True,
                'is_featured': True,
                'status': 'active'
            },
            {
                'name': 'Hashmatullah Shahidi',
                'role': 'batsman',
                'jersey_number': 5,
                'age': 29,
                'matches_played': 65,
                'runs_scored': 2150,
                'wickets_taken': 0,
                'batting_average': 35.80,
                'bowling_average': 0.00,
                'strike_rate': 85.40,
                'join_date': date(2018, 1, 1),
                'is_featured': True,
                'status': 'active'
            },
            {
                'name': 'Rahmanullah Gurbaz',
                'role': 'wicket-keeper',
                'jersey_number': 1,
                'age': 22,
                'matches_played': 45,
                'runs_scored': 1850,
                'wickets_taken': 0,
                'batting_average': 42.25,
                'bowling_average': 0.00,
                'strike_rate': 135.60,
                'join_date': date(2019, 1, 1),
                'is_featured': True,
                'status': 'active'
            },
            {
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
        ]

        for player_data in players_data:
            slug = slugify(player_data['name'])
            player, created = Player.objects.get_or_create(
                slug=slug,
                defaults=player_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created player: {player.name} with slug: {player.slug}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Player already exists: {player.name}')
                )