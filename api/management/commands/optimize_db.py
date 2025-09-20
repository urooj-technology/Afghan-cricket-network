from django.core.management.base import BaseCommand
from django.db import connection
from django.core.cache import cache


class Command(BaseCommand):
    help = 'Optimize database performance'

    def handle(self, *args, **options):
        self.stdout.write('Starting database optimization...')
        
        # Clear cache
        cache.clear()
        self.stdout.write(self.style.SUCCESS('Cache cleared'))
        
        # SQLite specific optimizations
        with connection.cursor() as cursor:
            # Enable WAL mode for better concurrency
            cursor.execute("PRAGMA journal_mode=WAL;")
            
            # Optimize SQLite settings
            cursor.execute("PRAGMA synchronous=NORMAL;")
            cursor.execute("PRAGMA cache_size=10000;")
            cursor.execute("PRAGMA temp_store=MEMORY;")
            cursor.execute("PRAGMA mmap_size=268435456;")  # 256MB
            
            # Analyze tables for better query planning
            cursor.execute("ANALYZE;")
            
        self.stdout.write(self.style.SUCCESS('Database optimization completed'))
        
        # Show some statistics
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()
            self.stdout.write(f'Total tables: {len(tables)}')
            
            cursor.execute("SELECT name FROM sqlite_master WHERE type='index';")
            indexes = cursor.fetchall()
            self.stdout.write(f'Total indexes: {len(indexes)}')