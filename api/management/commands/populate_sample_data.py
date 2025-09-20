import os
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.utils.text import slugify
from django.utils import timezone
from api.models.data import *
import requests
from io import BytesIO

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def add_arguments(self, parser):
        parser.add_argument('--clear', action='store_true', help='Clear existing data before populating')

    def handle(self, *args, **options):
        if options['clear']:
            self.clear_data()
        
        self.create_users()
        self.populate_news()
        self.populate_events()
        self.populate_team()
        self.populate_rankings()
        self.populate_media()
        self.populate_contact()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data'))

    def clear_data(self):
        self.stdout.write('Clearing existing data...')
        News.objects.all().delete()
        NewsCategory.objects.all().delete()
        Event.objects.all().delete()
        EventCategory.objects.all().delete()
        Venue.objects.all().delete()
        Player.objects.all().delete()
        TeamMember.objects.all().delete()
        TeamRole.objects.all().delete()
        TeamRanking.objects.all().delete()
        PlayerRanking.objects.all().delete()
        GeneralRanking.objects.all().delete()
        RankingCategory.objects.all().delete()
        Media.objects.all().delete()
        MediaCategory.objects.all().delete()
        MediaGallery.objects.all().delete()
        Contact.objects.all().delete()
        ContactCategory.objects.all().delete()
        ContactInfo.objects.all().delete()

    def create_users(self):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        
        users = ['editor1', 'editor2', 'author1', 'author2']
        for username in users:
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username, f'{username}@example.com', 'password123')

    def get_sample_image(self, width=400, height=300):
        """Generate a placeholder image"""
        try:
            url = f"https://picsum.photos/{width}/{height}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                return ContentFile(response.content, name=f'sample_{width}x{height}.jpg')
        except:
            pass
        return None

    def populate_news(self):
        self.stdout.write('Populating news data...')
        
        # Create categories
        categories = [
            'International Cricket', 'Domestic Cricket', 'Team News', 
            'Player Updates', 'Match Reports', 'Training', 'Awards', 
            'Youth Cricket', 'Women Cricket', 'Infrastructure'
        ]
        
        news_categories = []
        for cat_name in categories:
            category, created = NewsCategory.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slugify(cat_name), 'is_active': True}
            )
            news_categories.append(category)

        # Create news articles
        news_titles = [
            'Afghanistan Cricket Team Wins Historic Series',
            'New Cricket Academy Opens in Kabul',
            'Rashid Khan Breaks World Record',
            'Youth Cricket Program Launches',
            'Afghanistan Qualifies for World Cup',
            'New Stadium Construction Begins',
            'Women Cricket Team Formation',
            'International Coach Appointed',
            'Cricket Equipment Donation Drive',
            'Training Camp for Young Players'
        ]

        users = list(User.objects.all())
        
        for i, title in enumerate(news_titles):
            news = News.objects.create(
                title=title,
                slug=slugify(title),
                excerpt=f'This is an excerpt for {title}. It provides a brief overview of the news content.',
                content=f'This is the full content for {title}. ' * 10,
                author=random.choice(users),
                category=random.choice(news_categories),
                status=random.choice(['published', 'draft']),
                is_featured=i < 3,
                views=random.randint(100, 5000),
                published_at=timezone.now() - timedelta(days=random.randint(1, 30))
            )
            
            # Add image
            image = self.get_sample_image(800, 400)
            if image:
                news.image.save(f'news_{news.id}.jpg', image, save=True)

    def populate_events(self):
        self.stdout.write('Populating events data...')
        
        # Create event categories
        event_categories = []
        for cat_name in ['International Matches', 'Domestic Tournaments', 'Training Sessions', 'Awards Ceremonies', 'Youth Events']:
            category, created = EventCategory.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slugify(cat_name), 'is_active': True}
            )
            event_categories.append(category)

        # Create venues
        venue_data = [
            ('Sharjah Cricket Stadium', 'Sharjah', 'UAE', 15000),
            ('Kabul Cricket Ground', 'Kabul', 'Afghanistan', 8000),
            ('Kandahar Stadium', 'Kandahar', 'Afghanistan', 12000),
            ('Dubai International Stadium', 'Dubai', 'UAE', 25000),
            ('Herat Cricket Ground', 'Herat', 'Afghanistan', 5000),
        ]
        
        venues = []
        for name, city, country, capacity in venue_data:
            venue, created = Venue.objects.get_or_create(
                name=name,
                defaults={
                    'city': city,
                    'country': country,
                    'capacity': capacity,
                    'address': f'{name}, {city}, {country}'
                }
            )
            venues.append(venue)

        # Create events
        event_titles = [
            'Afghanistan vs Pakistan T20 Series',
            'National Cricket Championship',
            'Youth Cricket Training Camp',
            'Women Cricket Tournament',
            'International Coaching Workshop',
            'Cricket Awards Ceremony',
            'School Cricket Competition',
            'Veterans Cricket Match',
            'Cricket Equipment Exhibition',
            'Charity Cricket Match'
        ]

        for i, title in enumerate(event_titles):
            event_date = timezone.now() + timedelta(days=random.randint(-30, 60))
            event = Event.objects.create(
                title=title,
                slug=slugify(title),
                description=f'Description for {title}. This event will showcase the best of cricket.',
                category=random.choice(event_categories),
                event_type=random.choice(['international', 'domestic', 'training', 'tournament', 'friendly']),
                venue=random.choice(venues),
                date=event_date,
                end_date=event_date + timedelta(hours=random.randint(3, 8)),
                status=random.choice(['upcoming', 'ongoing', 'completed']),
                ticket_price=random.randint(10, 100) if random.choice([True, False]) else None,
                is_free=random.choice([True, False]),
                max_capacity=random.randint(100, 1000),
                registered_count=random.randint(50, 800),
                is_featured=i < 3,
                is_published=True
            )
            
            # Add image
            image = self.get_sample_image(600, 400)
            if image:
                event.image.save(f'event_{event.id}.jpg', image, save=True)

    def populate_team(self):
        self.stdout.write('Populating team data...')
        
        # Create team roles
        role_names = ['Captain', 'Vice Captain', 'Head Coach', 'Assistant Coach', 'Manager', 'Physiotherapist', 'Analyst', 'Media Manager']
        team_roles = []
        for role_name in role_names:
            role, created = TeamRole.objects.get_or_create(
                name=role_name,
                defaults={'is_active': True}
            )
            team_roles.append(role)

        # Create players
        player_data = [
            ('Rashid Khan', 'all-rounder', 19, 28),
            ('Mohammad Nabi', 'all-rounder', 1, 35),
            ('Rahmanullah Gurbaz', 'wicket-keeper', 55, 22),
            ('Najibullah Zadran', 'batsman', 11, 29),
            ('Mujeeb Ur Rahman', 'bowler', 10, 21),
            ('Fazalhaq Farooqi', 'bowler', 3, 23),
            ('Hashmatullah Shahidi', 'batsman', 50, 27),
            ('Ibrahim Zadran', 'batsman', 7, 25),
            ('Naveen-ul-Haq', 'bowler', 9, 24),
            ('Azmatullah Omarzai', 'all-rounder', 18, 23)
        ]

        for i, (name, role, jersey, age) in enumerate(player_data):
            player = Player.objects.create(
                name=name,
                slug=slugify(name),
                jersey_number=jersey,
                role=role,
                age=age,
                date_of_birth=timezone.now().date() - timedelta(days=age*365),
                bio=f'Biography of {name}. A talented cricket player.',
                matches_played=random.randint(20, 100),
                runs_scored=random.randint(500, 3000),
                wickets_taken=random.randint(10, 150),
                batting_average=round(random.uniform(20.0, 50.0), 2),
                bowling_average=round(random.uniform(15.0, 35.0), 2),
                strike_rate=round(random.uniform(80.0, 150.0), 2),
                debut_date=timezone.now().date() - timedelta(days=random.randint(365, 2000)),
                join_date=timezone.now().date() - timedelta(days=random.randint(100, 1000)),
                status='active',
                is_captain=i == 0,
                is_vice_captain=i == 1,
                is_featured=i < 5
            )
            
            # Add photo
            image = self.get_sample_image(300, 400)
            if image:
                player.photo.save(f'player_{player.id}.jpg', image, save=True)

        # Create team members
        member_data = [
            ('Jonathan Trott', 'Head Coach', 'coaches'),
            ('Raees Ahmadzai', 'Assistant Coach', 'coaches'),
            ('Shafiq Stanikzai', 'Team Manager', 'management'),
            ('Dr. Ahmad Shah', 'Team Doctor', 'staff'),
            ('Ali Reza', 'Physiotherapist', 'staff'),
            ('Hamid Shinwari', 'Analyst', 'staff'),
            ('Noor Ahmad', 'Media Manager', 'staff'),
            ('Farid Hotak', 'Equipment Manager', 'staff'),
            ('Zmarai Masjidi', 'Security Head', 'staff'),
            ('Waheed Kakar', 'Transport Manager', 'staff')
        ]

        for name, position, member_type in member_data:
            member = TeamMember.objects.create(
                name=name,
                slug=slugify(name),
                position=position,
                member_type=member_type,
                role=random.choice(team_roles) if random.choice([True, False]) else None,
                bio=f'Biography of {name}. An important member of the team.',
                join_date=timezone.now().date() - timedelta(days=random.randint(100, 1500)),
                is_active=True,
                order=random.randint(1, 10)
            )
            
            # Add photo
            image = self.get_sample_image(300, 400)
            if image:
                member.photo.save(f'member_{member.id}.jpg', image, save=True)

    def populate_rankings(self):
        self.stdout.write('Populating rankings data...')
        
        # Create ranking categories
        ranking_categories = []
        for cat_name in ['ICC Rankings', 'Domestic Rankings', 'Youth Rankings', 'Women Rankings']:
            category, created = RankingCategory.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slugify(cat_name), 'is_active': True}
            )
            ranking_categories.append(category)

        # Create team rankings
        team_data = [
            ('Afghanistan', 't20i', 1, 892, 1200, 45),
            ('India', 't20i', 2, 876, 1150, 52),
            ('Pakistan', 't20i', 3, 845, 1100, 48),
            ('England', 't20i', 4, 823, 1050, 50),
            ('Australia', 't20i', 5, 798, 980, 47),
            ('Afghanistan', 'odi', 1, 925, 1350, 38),
            ('India', 'odi', 2, 912, 1300, 42),
            ('Pakistan', 'odi', 3, 890, 1250, 40),
            ('England', 'odi', 4, 876, 1200, 45),
            ('Australia', 'odi', 5, 856, 1150, 43)
        ]

        for team_name, format_type, rank, rating, points, matches in team_data:
            TeamRanking.objects.create(
                team_name=team_name,
                format=format_type,
                rank=rank,
                rating=rating,
                points=points,
                matches_played=matches,
                country_code='AFG' if team_name == 'Afghanistan' else 'OTH',
                is_published=True
            )

        # Create player rankings
        players = Player.objects.all()
        categories = ['batting', 'bowling', 'all-rounder']
        formats = ['t20i', 'odi', 'test']

        for i, player in enumerate(players[:10]):
            for category in categories:
                for format_type in formats:
                    PlayerRanking.objects.create(
                        player=player,
                        player_name=player.name,
                        category=category,
                        format=format_type,
                        rank=i + 1,
                        rating=random.randint(700, 950),
                        points=random.randint(800, 1400),
                        wickets=random.randint(10, 200) if category == 'bowling' else None,
                        country='Afghanistan',
                        is_published=True
                    )

        # Create general rankings
        general_categories = ['team', 'player', 'batting', 'bowling', 'all-rounder']
        for i, category in enumerate(general_categories):
            for rank in range(1, 6):
                GeneralRanking.objects.create(
                    category=category,
                    title=f'{category.title()} Ranking #{rank}',
                    rank=rank,
                    points=random.randint(800, 1400),
                    rating=random.randint(700, 950),
                    description=f'Description for {category} ranking position {rank}',
                    is_published=True
                )

    def populate_media(self):
        self.stdout.write('Populating media data...')
        
        # Create media categories
        media_categories = []
        for cat_name in ['Match Photos', 'Training Videos', 'Interviews', 'Behind Scenes', 'Awards', 'Press Conferences']:
            category, created = MediaCategory.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slugify(cat_name), 'is_active': True}
            )
            media_categories.append(category)

        # Create media items
        media_data = [
            ('Afghanistan vs Pakistan Highlights', 'video', 'matches'),
            ('Training Session Photos', 'photo', 'training'),
            ('Rashid Khan Interview', 'video', 'interviews'),
            ('Team Celebration Photos', 'photo', 'awards'),
            ('Stadium Construction Gallery', 'gallery', 'behind_scenes'),
            ('Press Conference Video', 'video', 'interviews'),
            ('Player Profile Photos', 'photo', 'behind_scenes'),
            ('Match Statistics Document', 'document', 'matches'),
            ('Training Manual PDF', 'document', 'training'),
            ('Award Ceremony Video', 'video', 'awards')
        ]

        for i, (title, media_type, category) in enumerate(media_data):
            media = Media.objects.create(
                title=title,
                slug=slugify(title),
                description=f'Description for {title}. This media showcases important cricket content.',
                media_type=media_type,
                category=category,
                media_category=random.choice(media_categories),
                views=random.randint(100, 10000),
                is_featured=i < 3,
                is_published=True,
                published_at=timezone.now() - timedelta(days=random.randint(1, 30))
            )
            
            # Add image/thumbnail
            if media_type in ['photo', 'gallery']:
                image = self.get_sample_image(800, 600)
                if image:
                    media.image.save(f'media_{media.id}.jpg', image, save=True)
            else:
                thumbnail = self.get_sample_image(400, 300)
                if thumbnail:
                    media.thumbnail.save(f'thumb_{media.id}.jpg', thumbnail, save=True)

        # Create media galleries
        gallery_names = ['Best Moments 2024', 'Training Camp Gallery', 'Award Ceremony Photos']
        media_items = list(Media.objects.all())
        
        for name in gallery_names:
            gallery = MediaGallery.objects.create(
                name=name,
                slug=slugify(name),
                description=f'Gallery showcasing {name.lower()}',
                is_featured=True,
                is_published=True,
                order=random.randint(1, 10)
            )
            
            # Add cover image
            cover = self.get_sample_image(600, 400)
            if cover:
                gallery.cover_image.save(f'gallery_{gallery.id}.jpg', cover, save=True)
            
            # Add random media items
            gallery.media_items.set(random.sample(media_items, min(5, len(media_items))))

    def populate_contact(self):
        self.stdout.write('Populating contact data...')
        
        # Create contact categories
        contact_categories = []
        for cat_name in ['General Inquiry', 'Media Request', 'Partnership', 'Technical Support', 'Feedback']:
            category, created = ContactCategory.objects.get_or_create(
                name=cat_name,
                defaults={'is_active': True}
            )
            contact_categories.append(category)

        # Create contact messages
        contact_data = [
            ('John Smith', 'john@example.com', 'Partnership Opportunity'),
            ('Sarah Johnson', 'sarah@media.com', 'Interview Request'),
            ('Ahmad Ali', 'ahmad@email.com', 'General Question'),
            ('Maria Garcia', 'maria@sports.com', 'Media Coverage'),
            ('David Brown', 'david@company.com', 'Sponsorship Inquiry'),
            ('Lisa Wilson', 'lisa@fan.com', 'Fan Message'),
            ('Mike Davis', 'mike@tech.com', 'Website Issue'),
            ('Anna Taylor', 'anna@school.com', 'Educational Program'),
            ('Tom Anderson', 'tom@club.com', 'Club Partnership'),
            ('Emma White', 'emma@charity.com', 'Charity Event')
        ]

        for name, email, subject in contact_data:
            Contact.objects.create(
                name=name,
                email=email,
                phone=f'+93{random.randint(700000000, 799999999)}',
                subject=subject,
                message=f'This is a sample message from {name} regarding {subject}. ' * 3,
                category=random.choice(contact_categories),
                status=random.choice(['new', 'read', 'replied', 'closed']),
                priority=random.choice(['low', 'medium', 'high', 'urgent']),
                ip_address='192.168.1.1'
            )

        # Create contact info
        contact_info_data = [
            ('office', 'Main Office', 'Kabul Cricket Stadium, Kabul, Afghanistan', '+93-20-1234567', 'info@afghancricket.af', '9:00 AM - 5:00 PM'),
            ('emergency', 'Emergency Contact', None, '+93-70-1234567', 'emergency@afghancricket.af', '24/7'),
            ('media', 'Media Relations', None, '+93-70-9876543', 'media@afghancricket.af', '9:00 AM - 6:00 PM'),
            ('general', 'General Inquiries', None, '+93-20-5555555', 'contact@afghancricket.af', '8:00 AM - 4:00 PM')
        ]

        for i, (contact_type, title, address, phone, email, hours) in enumerate(contact_info_data):
            ContactInfo.objects.create(
                contact_type=contact_type,
                title=title,
                address=address,
                phone=phone,
                email=email,
                office_hours=hours,
                is_active=True,
                order=i + 1
            )

        self.stdout.write(self.style.SUCCESS('Sample data population completed!'))