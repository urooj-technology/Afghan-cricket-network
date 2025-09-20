# Afghan Cricket Network - Models Documentation

This document describes all the Django models created for the Afghan Cricket Network project based on the frontend UI requirements.

## Model Structure

### Base Model
- `BaseModel`: Abstract base class with `created_at` and `updated_at` fields

### News Models (`data/news.py`)
- `NewsCategory`: Categories for news articles (Match Reports, Team News, etc.)
- `News`: Main news articles with multilingual support, status management, and view tracking

### Events Models (`data/events.py`)
- `EventCategory`: Categories for events (International, Training, etc.)
- `Venue`: Cricket venues with location and capacity information
- `Event`: Cricket events and matches with registration tracking

### Team Models (`data/team.py`)
- `TeamRole`: Roles for team members (Captain, Coach, Manager, etc.)
- `Player`: Cricket players with detailed statistics and career information
- `TeamMember`: Non-player team members (management, coaches, staff)

### Rankings Models (`data/rankings.py`)
- `RankingCategory`: Categories for rankings
- `TeamRanking`: Team rankings by format (T20I, ODI, Test)
- `PlayerRanking`: Player rankings by category and format
- `GeneralRanking`: General purpose rankings

### Media Models (`data/media.py`)
- `MediaCategory`: Categories for media content
- `Media`: Photos, videos, and other media files
- `MediaGallery`: Collections of media items

### Contact Models (`data/contact.py`)
- `ContactCategory`: Categories for contact inquiries
- `Contact`: Contact form submissions with status tracking
- `ContactInfo`: Organization contact information

## Key Features

### Multilingual Support
All models support three languages:
- English (default)
- Pashto (`_ps` suffix)
- Farsi/Dari (`_fa` suffix)

### Status Management
Most content models include status fields:
- `is_published`: Controls public visibility
- `is_featured`: Highlights important content
- `status`: Workflow states (draft, published, archived, etc.)

### SEO-Friendly
- Slug fields for clean URLs
- Meta descriptions and excerpts
- Image fields for social sharing

### Admin Integration
All models are registered in Django admin with:
- List displays showing key information
- Filters for easy content management
- Search functionality
- Prepopulated slug fields

## Usage

### Running Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Sample Data
```bash
python manage.py create_sample_data
```

### Admin Access
- URL: `/admin/`
- Default superuser: `admin` / `admin123` (created by sample data command)

## Model Relationships

- News articles belong to categories and authors
- Events are associated with venues and categories
- Players have detailed statistics and career information
- Rankings track teams and players across different formats
- Media items can be organized into galleries
- Contact messages can be categorized and tracked

All models inherit from `BaseModel` for consistent timestamps and can be extended as needed for future requirements.