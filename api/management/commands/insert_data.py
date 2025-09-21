from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.text import slugify
from faker import Faker
import random
from datetime import datetime, timedelta
from decimal import Decimal

from api.models.data.news import NewsCategory, News
from api.models.data.events import EventCategory, Venue, Event
from api.models.data.team import TeamRole, Player, TeamMember
from api.models.data.rankings import RankingCategory, TeamRanking, PlayerRanking, GeneralRanking
from api.models.data.media import MediaCategory, Media, MediaGallery
from api.models.data.contact import ContactCategory, Contact, ContactInfo

User = get_user_model()

class Command(BaseCommand):
    help = 'Insert 1000 fake records for each model in Pashto language'

    def __init__(self):
        super().__init__()
        self.fake = Faker('en_US')  # Use English locale as fallback
        
        # Pashto data
        self.pashto_names = [
            'احمد شاه', 'محمد کریم', 'عبدالله', 'رحمت الله', 'نور محمد', 'فرید احمد', 'ظاهر شاه',
            'حبیب الله', 'عزیز الله', 'شیر محمد', 'غلام حیدر', 'محمد یوسف', 'عبدالرحمن', 'محمد اسلم',
            'نصرالله', 'محمد نعیم', 'عبدالواحد', 'محمد طاهر', 'احمد ضیا', 'محمد اشرف'
        ]
        
        self.pashto_cities = [
            'کابل', 'کندهار', 'هرات', 'مزار شریف', 'جلال آباد', 'قندوز', 'غزني', 'پکتیا',
            'خوست', 'لغمان', 'کنړ', 'بدخشان', 'تخار', 'بغلان', 'سمنګان', 'فاریاب'
        ]
        
        self.cricket_terms_ps = [
            'کرکټ', 'لوبه', 'ټیم', 'لوبغاړی', 'توپ', 'بیټ', 'ویکټ', 'منډه', 'اوور',
            'کپتان', 'بولر', 'بیټسمن', 'فیلډر', 'امپایر', 'سکور', 'رن', 'سکس', 'فور'
        ]

    def add_arguments(self, parser):
        parser.add_argument('--count', type=int, default=1000, help='Number of records to create per model')

    def handle(self, *args, **options):
        count = options['count']
        
        self.stdout.write(f'Creating {count} records for each model...')
        
        # Create admin user if not exists
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@acn.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()

        # Insert data for each model
        self.create_news_data(count, admin_user)
        self.create_events_data(count)
        self.create_team_data(count)
        self.create_rankings_data(count)
        self.create_media_data(count)
        self.create_contact_data(count)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} records for each model'))

    def create_news_data(self, count, admin_user):
        # Create categories
        categories = []
        for i in range(10):
            name = f"{random.choice(self.cricket_terms_ps)} کټګورۍ {i+1}"
            category, _ = NewsCategory.objects.get_or_create(
                name=name,
                slug=slugify(f"category-{i+1}-{random.randint(1000, 9999)}"),
                defaults={'is_active': True}
            )
            categories.append(category)

        # Create news articles
        for i in range(count):
            title = f"{random.choice(self.cricket_terms_ps)} {random.choice(['خبر', 'پیښه', 'لوبه'])} {i+1}"
            News.objects.create(
                title=title,
                slug=slugify(f"news-{i+1}-{random.randint(1000, 9999)}"),
                excerpt=f"دا د {random.choice(self.cricket_terms_ps)} په اړه لنډ معلومات دي.",
                content=f"دا د {title} بشپړ متن دی. دلته د کرکټ ټولې تفصیلات راغلي دي.",
                author=admin_user,
                category=random.choice(categories),
                status=random.choice(['draft', 'published']),
                is_featured=random.choice([True, False]),
                views=random.randint(0, 10000),
                published_at=timezone.now() - timedelta(days=random.randint(0, 365))
            )

    def create_events_data(self, count):
        # Create event categories
        categories = []
        for i in range(5):
            name = f"{random.choice(self.cricket_terms_ps)} پیښې {i+1}"
            category, _ = EventCategory.objects.get_or_create(
                name=name,
                slug=slugify(f"event-category-{i+1}-{random.randint(1000, 9999)}"),
                defaults={'is_active': True}
            )
            categories.append(category)

        # Create venues
        venues = []
        for i in range(20):
            city = random.choice(self.pashto_cities)
            venue, _ = Venue.objects.get_or_create(
                name=f"د {city} کرکټ ډګر",
                city=city,
                defaults={
                    'country': 'افغانستان',
                    'capacity': random.randint(5000, 50000),
                    'address': f"د {city} ښار، افغانستان"
                }
            )
            venues.append(venue)

        # Create events
        for i in range(count):
            title = f"{random.choice(self.cricket_terms_ps)} {random.choice(['سیالي', 'لوبه', 'ټورنمنټ'])} {i+1}"
            Event.objects.create(
                title=title,
                slug=slugify(f"event-{i+1}-{random.randint(1000, 9999)}"),
                description=f"دا د {title} تفصیلي معلومات دي.",
                category=random.choice(categories),
                event_type=random.choice(['international', 'domestic', 'training', 'tournament', 'friendly']),
                venue=random.choice(venues),
                date=timezone.now() + timedelta(days=random.randint(-30, 365)),
                status=random.choice(['upcoming', 'ongoing', 'completed', 'cancelled']),
                is_free=random.choice([True, False]),
                max_capacity=random.randint(100, 10000),
                registered_count=random.randint(0, 5000),
                is_featured=random.choice([True, False])
            )

    def create_team_data(self, count):
        # Create team roles
        roles = []
        role_names = ['کپتان', 'مرستیال کپتان', 'بولر', 'بیټسمن', 'ویکټ کیپر', 'فیلډر']
        for name in role_names:
            role, _ = TeamRole.objects.get_or_create(
                name=name,
                defaults={'is_active': True}
            )
            roles.append(role)

        # Create players
        used_jersey_numbers = set()
        for i in range(count):
            name = random.choice(self.pashto_names)
            
            # Generate unique jersey number or None
            jersey_number = None
            if random.choice([True, False]) and len(used_jersey_numbers) < 999:
                while True:
                    num = random.randint(1, 999)
                    if num not in used_jersey_numbers:
                        jersey_number = num
                        used_jersey_numbers.add(num)
                        break
            
            Player.objects.create(
                name=name,
                slug=slugify(f"player-{i+1}-{random.randint(1000, 9999)}"),
                jersey_number=jersey_number,
                role=random.choice(['batsman', 'bowler', 'all-rounder', 'wicket-keeper']),
                position=random.choice(role_names),
                age=random.randint(18, 40),
                bio=f"دا د {name} لنډ ژوندلیک دی.",
                matches_played=random.randint(0, 200),
                runs_scored=random.randint(0, 10000),
                wickets_taken=random.randint(0, 500),
                batting_average=Decimal(str(random.uniform(10.0, 60.0))),
                bowling_average=Decimal(str(random.uniform(15.0, 40.0))),
                strike_rate=Decimal(str(random.uniform(80.0, 180.0))),
                join_date=timezone.now().date() - timedelta(days=random.randint(0, 3650)),
                status=random.choice(['active', 'injured', 'retired', 'suspended']),
                is_captain=i == 0,
                is_vice_captain=i == 1,
                is_featured=random.choice([True, False])
            )

        # Create team members
        for i in range(count):
            name = random.choice(self.pashto_names)
            TeamMember.objects.create(
                name=name,
                slug=slugify(f"member-{i+1}-{random.randint(1000, 9999)}"),
                position=random.choice(['مربي', 'مدیر', 'ډاکټر', 'فزیوتراپست', 'تحلیلګر']),
                member_type=random.choice(['management', 'coaches', 'staff', 'players']),
                role=random.choice(roles),
                bio=f"دا د {name} د کار تجربه ده.",
                join_date=timezone.now().date() - timedelta(days=random.randint(0, 3650)),
                is_active=True,
                order=i
            )

    def create_rankings_data(self, count):
        # Create ranking categories
        categories = []
        for i in range(5):
            name = f"{random.choice(self.cricket_terms_ps)} درجه بندي {i+1}"
            category, _ = RankingCategory.objects.get_or_create(
                name=name,
                slug=slugify(f"ranking-category-{i+1}-{random.randint(1000, 9999)}"),
                defaults={'is_active': True}
            )
            categories.append(category)

        # Create team rankings
        formats = ['t20i', 'odi', 'test']
        teams = ['افغانستان', 'پاکستان', 'هندوستان', 'انګلستان', 'آسټرالیا']
        
        # Create max 20 rankings per format
        for format_choice in formats:
            for rank in range(1, min(21, count + 1)):
                TeamRanking.objects.create(
                    team_name=random.choice(teams),
                    format=format_choice,
                    rank=rank,
                    rating=random.randint(500, 1000),
                    points=random.randint(500, 1000),
                    matches_played=random.randint(10, 100),
                    country_code=random.choice(['AFG', 'PAK', 'IND', 'ENG', 'AUS']),
                    is_published=True
                )

        # Create player rankings
        categories_list = ['batting', 'bowling', 'all-rounder']
        # Create max 10 rankings per category-format combination
        for category in categories_list:
            for format_choice in formats:
                for rank in range(1, min(11, count + 1)):
                    PlayerRanking.objects.create(
                        player_name=random.choice(self.pashto_names),
                        category=category,
                        format=format_choice,
                        rank=rank,
                        rating=random.randint(400, 900),
                        points=random.randint(400, 900),
                        wickets=random.randint(0, 300) if random.choice([True, False]) else None,
                        country='افغانستان',
                        is_published=True
                    )

        # Create general rankings
        for i in range(count):
            GeneralRanking.objects.create(
                category=random.choice(['team', 'player', 'batting', 'bowling', 'all-rounder']),
                title=f"{random.choice(self.cricket_terms_ps)} درجه بندي {i+1}",
                rank=i+1,
                points=random.randint(100, 1000),
                rating=random.randint(100, 1000),
                description=f"دا د {random.choice(self.cricket_terms_ps)} درجه بندي تفصیلات دي.",
                is_published=True
            )

    def create_media_data(self, count):
        # Create media categories
        categories = []
        for i in range(10):
            name = f"{random.choice(self.cricket_terms_ps)} رسنۍ {i+1}"
            category, _ = MediaCategory.objects.get_or_create(
                name=name,
                slug=slugify(f"media-category-{i+1}-{random.randint(1000, 9999)}"),
                defaults={'is_active': True}
            )
            categories.append(category)

        # Create media items
        for i in range(count):
            title = f"{random.choice(self.cricket_terms_ps)} {random.choice(['انځور', 'ویډیو', 'سند'])} {i+1}"
            Media.objects.create(
                title=title,
                slug=slugify(f"media-{i+1}-{random.randint(1000, 9999)}"),
                description=f"دا د {title} تفصیلات دي.",
                media_type=random.choice(['photo', 'video', 'gallery', 'document']),
                category=random.choice(['matches', 'events', 'training', 'awards', 'behind_scenes', 'interviews']),
                media_category=random.choice(categories),
                views=random.randint(0, 50000),
                is_featured=random.choice([True, False]),
                is_published=True,
                published_at=timezone.now() - timedelta(days=random.randint(0, 365))
            )

        # Create media galleries
        for i in range(100):
            MediaGallery.objects.create(
                name=f"{random.choice(self.cricket_terms_ps)} ګالري {i+1}",
                slug=slugify(f"gallery-{i+1}-{random.randint(1000, 9999)}"),
                description=f"دا د کرکټ انځورونو ګالري ده.",
                is_featured=random.choice([True, False]),
                is_published=True,
                order=i
            )

    def create_contact_data(self, count):
        # Create contact categories
        categories = []
        category_names = ['عمومي پوښتنې', 'رسنۍ', 'ټیکټونه', 'تکنیکي ملاتړ', 'شکایات']
        for name in category_names:
            category, _ = ContactCategory.objects.get_or_create(
                name=name,
                defaults={'is_active': True}
            )
            categories.append(category)

        # Create contact messages
        for i in range(count):
            name = random.choice(self.pashto_names)
            Contact.objects.create(
                name=name,
                email=f"{slugify(name)}{i}@example.com",
                phone=f"+93{random.randint(700000000, 799999999)}",
                subject=f"د {random.choice(self.cricket_terms_ps)} په اړه پوښتنه",
                message=f"زه د {random.choice(self.cricket_terms_ps)} په اړه پوښتنه لرم.",
                category=random.choice(categories),
                status=random.choice(['new', 'read', 'replied', 'closed']),
                priority=random.choice(['low', 'medium', 'high', 'urgent']),
                ip_address=f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}"
            )

        # Create contact info
        contact_types = ['office', 'emergency', 'media', 'general']
        for i, contact_type in enumerate(contact_types):
            ContactInfo.objects.create(
                contact_type=contact_type,
                title=f"د {random.choice(self.pashto_cities)} دفتر",
                address=f"د {random.choice(self.pashto_cities)} ښار، افغانستان",
                phone=f"+93{random.randint(700000000, 799999999)}",
                email=f"{contact_type}@acn.com",
                office_hours="شنبه - پنجشنبه: 8:00 - 17:00",
                is_active=True,
                order=i
            )