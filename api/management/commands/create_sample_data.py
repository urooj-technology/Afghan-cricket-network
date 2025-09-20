import os
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.utils.text import slugify
from django.utils import timezone
from api.models.data import *
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample data for all models'

    def add_arguments(self, parser):
        parser.add_argument('--clear', action='store_true', help='Clear existing data')

    def handle(self, *args, **options):
        if options['clear']:
            self.clear_data()
        
        self.create_users()
        self.create_news_data()
        self.create_events_data()
        self.create_team_data()
        self.create_rankings_data()
        self.create_media_data()
        self.create_contact_data()
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))

    def clear_data(self):
        self.stdout.write('Clearing existing data...')
        models_to_clear = [
            News, NewsCategory, Event, EventCategory, Venue,
            Player, TeamMember, TeamRole, TeamRanking, PlayerRanking,
            GeneralRanking, RankingCategory, Media, MediaCategory,
            MediaGallery, Contact, ContactCategory, ContactInfo
        ]
        for model in models_to_clear:
            model.objects.all().delete()

    def create_users(self):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        
        for i in range(1, 4):
            username = f'user{i}'
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username, f'{username}@example.com', 'password123')

    def create_placeholder_image(self, width=400, height=300, text="Sample"):
        """Create a simple placeholder image"""
        img = Image.new('RGB', (width, height), color=(70, 130, 180))
        draw = ImageDraw.Draw(img)
        
        # Try to use a font, fallback to default if not available
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
        except:
            font = ImageFont.load_default()
        
        # Calculate text position
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        draw.text((x, y), text, fill=(255, 255, 255), font=font)
        
        # Save to BytesIO
        img_io = BytesIO()
        img.save(img_io, format='JPEG', quality=85)
        img_io.seek(0)
        
        return ContentFile(img_io.getvalue(), name=f'{text.lower().replace(" ", "_")}.jpg')

    def create_news_data(self):
        self.stdout.write('Creating news data...')
        
        # Categories
        categories = [
            'International Cricket', 'Domestic Cricket', 'Team News',
            'Player Updates', 'Match Reports', 'Training', 'Awards',
            'Youth Cricket', 'Women Cricket', 'Infrastructure'
        ]
        
        news_categories = []
        for cat in categories:
            category = NewsCategory.objects.create(
                name=cat,
                slug=slugify(cat),
                is_active=True
            )
            news_categories.append(category)

        # News articles
        titles = [
            'Afghanistan Wins Historic Cricket Series',
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
        
        for i, title in enumerate(titles):
            news = News.objects.create(
                title=title,
                slug=slugify(title),
                excerpt=f'Brief overview of {title}. This news article covers important developments in Afghan cricket.',
                content=f'Full content for {title}. ' + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' * 20,
                author=random.choice(users),
                category=random.choice(news_categories),
                status='published' if i < 8 else 'draft',
                is_featured=i < 3,
                views=random.randint(100, 5000),
                published_at=timezone.now() - timedelta(days=random.randint(1, 30))
            )
            
            # Add image
            image = self.create_placeholder_image(800, 400, f'News {i+1}')
            news.image.save(f'news_{news.id}.jpg', image, save=True)

    def create_events_data(self):
        self.stdout.write('Creating events data...')
        
        # Event categories
        categories = ['International Matches', 'Domestic Tournaments', 'Training Sessions', 'Awards Ceremonies', 'Youth Events']
        event_categories = []
        for cat in categories:
            category = EventCategory.objects.create(
                name=cat,
                slug=slugify(cat),
                is_active=True
            )
            event_categories.append(category)

        # Venues
        venue_data = [
            ('Sharjah Cricket Stadium', 'Sharjah', 'UAE', 15000),
            ('Kabul Cricket Ground', 'Kabul', 'Afghanistan', 8000),
            ('Kandahar Stadium', 'Kandahar', 'Afghanistan', 12000),
            ('Dubai International Stadium', 'Dubai', 'UAE', 25000),
            ('Herat Cricket Ground', 'Herat', 'Afghanistan', 5000),
        ]
        
        venues = []
        for name, city, country, capacity in venue_data:
            venue = Venue.objects.create(
                name=name,
                city=city,
                country=country,
                capacity=capacity,
                address=f'{name}, {city}, {country}'
            )
            venues.append(venue)

        # Events
        titles = [
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

        for i, title in enumerate(titles):
            event_date = timezone.now() + timedelta(days=random.randint(-30, 60))
            event = Event.objects.create(
                title=title,
                slug=slugify(title),
                description=f'Description for {title}. This event showcases the best of Afghan cricket.',
                category=random.choice(event_categories),
                event_type=random.choice(['international', 'domestic', 'training', 'tournament', 'friendly']),
                venue=random.choice(venues),
                date=event_date,
                end_date=event_date + timedelta(hours=random.randint(3, 8)),
                status=random.choice(['upcoming', 'ongoing', 'completed']),
                ticket_price=random.randint(10, 100) if not random.choice([True, False]) else None,
                is_free=random.choice([True, False]),
                max_capacity=random.randint(100, 1000),
                registered_count=random.randint(50, 800),
                is_featured=i < 3,
                is_published=True
            )
            
            # Add image
            image = self.create_placeholder_image(600, 400, f'Event {i+1}')
            event.image.save(f'event_{event.id}.jpg', image, save=True)

    def create_team_data(self):
        self.stdout.write('Creating team data...')
        
        # Team roles
        roles = ['Captain', 'Vice Captain', 'Head Coach', 'Assistant Coach', 'Manager', 'Physiotherapist']
        team_roles = []
        for role in roles:
            team_role = TeamRole.objects.create(name=role, is_active=True)
            team_roles.append(team_role)

        # Players
        player_data = [
            ('Rashid Khan', 'all-rounder', 19, 28, True, False),
            ('Mohammad Nabi', 'all-rounder', 1, 35, False, True),
            ('Rahmanullah Gurbaz', 'wicket-keeper', 55, 22, False, False),
            ('Najibullah Zadran', 'batsman', 11, 29, False, False),
            ('Mujeeb Ur Rahman', 'bowler', 10, 21, False, False),
            ('Fazalhaq Farooqi', 'bowler', 3, 23, False, False),
            ('Hashmatullah Shahidi', 'batsman', 50, 27, False, False),
            ('Ibrahim Zadran', 'batsman', 7, 25, False, False),
            ('Naveen-ul-Haq', 'bowler', 9, 24, False, False),
            ('Azmatullah Omarzai', 'all-rounder', 18, 23, False, False)
        ]

        for name, role, jersey, age, is_captain, is_vice in player_data:
            player = Player.objects.create(
                name=name,
                slug=slugify(name),
                jersey_number=jersey,
                role=role,
                age=age,
                date_of_birth=timezone.now().date() - timedelta(days=age*365),
                bio=f'Biography of {name}, a talented {role} for Afghanistan cricket team.',
                matches_played=random.randint(20, 100),
                runs_scored=random.randint(500, 3000),
                wickets_taken=random.randint(10, 150),
                batting_average=round(random.uniform(20.0, 50.0), 2),
                bowling_average=round(random.uniform(15.0, 35.0), 2),
                strike_rate=round(random.uniform(80.0, 150.0), 2),
                debut_date=timezone.now().date() - timedelta(days=random.randint(365, 2000)),
                join_date=timezone.now().date() - timedelta(days=random.randint(100, 1000)),
                status='active',
                is_captain=is_captain,
                is_vice_captain=is_vice,
                is_featured=jersey <= 19
            )
            
            # Add photo
            image = self.create_placeholder_image(300, 400, name.split()[0])
            player.photo.save(f'player_{player.id}.jpg', image, save=True)

        # Team members
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

        for i, (name, position, member_type) in enumerate(member_data):
            member = TeamMember.objects.create(
                name=name,
                slug=slugify(name),
                position=position,
                member_type=member_type,
                role=random.choice(team_roles) if random.choice([True, False]) else None,
                bio=f'Biography of {name}, serving as {position} for Afghanistan cricket team.',
                join_date=timezone.now().date() - timedelta(days=random.randint(100, 1500)),
                is_active=True,
                order=i + 1
            )
            
            # Add photo
            image = self.create_placeholder_image(300, 400, name.split()[0])
            member.photo.save(f'member_{member.id}.jpg', image, save=True)

    def create_rankings_data(self):
        self.stdout.write('Creating rankings data...')
        
        # Ranking categories
        categories = ['ICC Rankings', 'Domestic Rankings', 'Youth Rankings']
        for cat in categories:
            RankingCategory.objects.create(
                name=cat,
                slug=slugify(cat),
                is_active=True
            )

        # Team rankings
        team_data = [
            ('Afghanistan', 't20i', 1, 892, 1200, 45, 'AFG'),
            ('India', 't20i', 2, 876, 1150, 52, 'IND'),
            ('Pakistan', 't20i', 3, 845, 1100, 48, 'PAK'),
            ('England', 't20i', 4, 823, 1050, 50, 'ENG'),
            ('Australia', 't20i', 5, 798, 980, 47, 'AUS'),
            ('Afghanistan', 'odi', 1, 925, 1350, 38, 'AFG'),
            ('India', 'odi', 2, 912, 1300, 42, 'IND'),
            ('Pakistan', 'odi', 3, 890, 1250, 40, 'PAK'),
            ('England', 'odi', 4, 876, 1200, 45, 'ENG'),
            ('Australia', 'odi', 5, 856, 1150, 43, 'AUS')
        ]

        for team, format_type, rank, rating, points, matches, code in team_data:
            TeamRanking.objects.create(
                team_name=team,
                format=format_type,
                rank=rank,
                rating=rating,
                points=points,
                matches_played=matches,
                country_code=code,
                is_published=True
            )

        # Player rankings
        players = list(Player.objects.all())
        categories = ['batting', 'bowling', 'all-rounder']
        formats = ['t20i', 'odi', 'test']

        for i, player in enumerate(players):
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

    def create_media_data(self):
        self.stdout.write('Creating media data...')
        
        # Media categories
        categories = ['Match Photos', 'Training Videos', 'Interviews', 'Behind Scenes', 'Awards']
        media_categories = []
        for cat in categories:
            category = MediaCategory.objects.create(
                name=cat,
                slug=slugify(cat),
                is_active=True
            )
            media_categories.append(category)

        # Media items
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
                description=f'Description for {title}. High-quality {media_type} content.',
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
                image = self.create_placeholder_image(800, 600, f'Media {i+1}')
                media.image.save(f'media_{media.id}.jpg', image, save=True)
            else:
                thumbnail = self.create_placeholder_image(400, 300, f'Thumb {i+1}')
                media.thumbnail.save(f'thumb_{media.id}.jpg', thumbnail, save=True)

    def create_contact_data(self):
        self.stdout.write('Creating contact data...')
        
        # Contact categories
        categories = ['General Inquiry', 'Media Request', 'Partnership', 'Technical Support', 'Feedback']
        contact_categories = []
        for cat in categories:
            category = ContactCategory.objects.create(name=cat, is_active=True)
            contact_categories.append(category)

        # Contact messages
        contacts = [
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

        for name, email, subject in contacts:
            Contact.objects.create(
                name=name,
                email=email,
                phone=f'+93{random.randint(700000000, 799999999)}',
                subject=subject,
                message=f'Sample message from {name} regarding {subject}. This is a detailed inquiry about cricket-related matters.',
                category=random.choice(contact_categories),
                status=random.choice(['new', 'read', 'replied', 'closed']),
                priority=random.choice(['low', 'medium', 'high', 'urgent']),
                ip_address='192.168.1.1'
            )

        # Contact info
        contact_info = [
            ('office', 'Main Office', 'Kabul Cricket Stadium, Kabul, Afghanistan', '+93-20-1234567', 'info@afghancricket.af'),
            ('emergency', 'Emergency Contact', None, '+93-70-1234567', 'emergency@afghancricket.af'),
            ('media', 'Media Relations', None, '+93-70-9876543', 'media@afghancricket.af'),
            ('general', 'General Inquiries', None, '+93-20-5555555', 'contact@afghancricket.af')
        ]

        for i, (contact_type, title, address, phone, email) in enumerate(contact_info):
            ContactInfo.objects.create(
                contact_type=contact_type,
                title=title,
                address=address,
                phone=phone,
                email=email,
                office_hours='9:00 AM - 5:00 PM' if contact_type != 'emergency' else '24/7',
                is_active=True,
                order=i + 1
            )