from django.core.management.base import BaseCommand
from api.models.data.media import Media, MediaCategory

class Command(BaseCommand):
    help = 'Populate media data'

    def handle(self, *args, **options):
        self.stdout.write("📸 Populating Media Data...")
        
        # Create media categories
        categories = [
            {'name': 'Matches', 'slug': 'matches'},
            {'name': 'Events', 'slug': 'events'},
            {'name': 'Training', 'slug': 'training'},
            {'name': 'Awards', 'slug': 'awards'},
            {'name': 'Behind the Scenes', 'slug': 'behind-scenes'},
            {'name': 'Interviews', 'slug': 'interviews'},
        ]
        
        for cat_data in categories:
            category, created = MediaCategory.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f"✅ Created media category: {category.name}")
        
        # Media data
        media_data = [
            # Photos
            {'title': 'Afghanistan vs Pakistan T20I Highlights', 'media_type': 'photo', 'category': 'matches', 'is_featured': True, 'views': 15000, 'description': 'Best moments from the thrilling T20I match'},
            {'title': 'Rashid Khan Bowling Action', 'media_type': 'photo', 'category': 'matches', 'is_featured': True, 'views': 12000, 'description': 'Rashid Khan in his signature bowling action'},
            {'title': 'Team Celebration After Victory', 'media_type': 'photo', 'category': 'matches', 'views': 8000, 'description': 'Afghanistan team celebrating their historic win'},
            {'title': 'Training Session at Kabul Stadium', 'media_type': 'photo', 'category': 'training', 'views': 5000, 'description': 'Players during intense training session'},
            {'title': 'Awards Ceremony 2024', 'media_type': 'photo', 'category': 'awards', 'is_featured': True, 'views': 10000, 'description': 'Annual cricket awards ceremony'},
            
            # Videos
            {'title': 'Rashid Khan Best Wickets Compilation', 'media_type': 'video', 'category': 'matches', 'is_featured': True, 'views': 25000, 'description': 'Top wickets by Rashid Khan in international cricket'},
            {'title': 'Mohammad Nabi Interview', 'media_type': 'video', 'category': 'interviews', 'views': 8000, 'description': 'Exclusive interview with Mohammad Nabi'},
            {'title': 'Behind the Scenes: World Cup Preparation', 'media_type': 'video', 'category': 'behind_scenes', 'views': 12000, 'description': 'Inside look at team preparation for World Cup'},
            {'title': 'Training Highlights', 'media_type': 'video', 'category': 'training', 'views': 6000, 'description': 'Best moments from training sessions'},
            
            # Galleries
            {'title': 'World Cup 2023 Photo Gallery', 'media_type': 'gallery', 'category': 'events', 'is_featured': True, 'views': 18000, 'description': 'Complete photo collection from World Cup 2023'},
            {'title': 'Team Portraits 2024', 'media_type': 'gallery', 'category': 'events', 'views': 7000, 'description': 'Official team portraits for 2024 season'},
            
            # Documents
            {'title': 'Match Statistics Report', 'media_type': 'document', 'category': 'matches', 'views': 3000, 'description': 'Detailed statistical analysis of recent matches'},
            {'title': 'Training Manual 2024', 'media_type': 'document', 'category': 'training', 'views': 2000, 'description': 'Official training guidelines and procedures'},
        ]
        
        # Create media items
        for i, media_item in enumerate(media_data, 1):
            media_item['slug'] = f"media-{i}"
            media, created = Media.objects.get_or_create(
                slug=media_item['slug'],
                defaults=media_item
            )
            if created:
                self.stdout.write(f"✅ Created media: {media.title} ({media.media_type})")
        
        self.stdout.write(f"\n🎉 Media data population completed!")
        self.stdout.write(f"📸 Total Media Items: {Media.objects.count()}")
        self.stdout.write(f"📂 Total Media Categories: {MediaCategory.objects.count()}")