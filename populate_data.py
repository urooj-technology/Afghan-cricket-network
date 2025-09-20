#!/usr/bin/env python
"""
Script to populate the database with sample data
Run this script from the project root directory
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Import and run the management command
from django.core.management import call_command

if __name__ == '__main__':
    print("🚀 Starting database population...")
    print("This will create sample data for all models including images.")
    
    # Ask for confirmation
    response = input("\nDo you want to clear existing data first? (y/N): ")
    clear_data = response.lower() in ['y', 'yes']
    
    try:
        if clear_data:
            print("\n🗑️  Clearing existing data...")
            call_command('create_sample_data', '--clear')
        else:
            print("\n📝 Creating sample data...")
            call_command('create_sample_data')
            
        print("\n✅ Database populated successfully!")
        print("\nSample data created:")
        print("- 10 News articles with images")
        print("- 10 Events with images")
        print("- 10 Players with photos")
        print("- 10 Team members with photos")
        print("- 5 Venues")
        print("- Team and Player rankings")
        print("- 10 Media items with images/thumbnails")
        print("- 10 Contact messages")
        print("- Contact information")
        print("\nYou can now test the API endpoints and frontend pages!")
        
    except Exception as e:
        print(f"\n❌ Error occurred: {e}")
        print("Make sure you're running this from the project root directory.")
        print("Also ensure the database is properly configured and migrations are applied.")
        
    print("\n🔗 Useful commands:")
    print("- python manage.py runserver (start Django server)")
    print("- cd frontend && npm run dev (start Next.js frontend)")
    print("- python manage.py createsuperuser (create admin user)")