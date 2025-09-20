# Database Population Guide

This guide explains how to populate your Afghan Cricket Network database with sample data.

## 📋 Prerequisites

1. **Database Setup**: Ensure your database is configured and migrations are applied
   ```bash
   python manage.py migrate
   ```

2. **Virtual Environment**: Activate your virtual environment
   ```bash
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Dependencies**: Install required packages
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Quick Start

### Option 1: Using Bash Script (Recommended for Linux/Mac)
```bash
./populate_data.sh
```

### Option 2: Using Python Script
```bash
python populate_data.py
```

### Option 3: Using Django Management Command Directly
```bash
# Create sample data
python manage.py create_sample_data

# Clear existing data and create new sample data
python manage.py create_sample_data --clear
```

## 📊 What Gets Created

The script will populate your database with:

### News & Content
- **10 News Articles** with placeholder images
- **10 News Categories** (International, Domestic, Team News, etc.)
- **Published and Draft** articles for testing

### Events & Venues
- **10 Cricket Events** with images
- **5 Event Categories** (Matches, Tournaments, Training, etc.)
- **5 Cricket Venues** (Sharjah, Kabul, Kandahar, Dubai, Herat)
- **Different event types** (International, Domestic, Training, etc.)

### Team & Players
- **10 Players** with photos and statistics
- **10 Team Members** (coaches, staff, management)
- **6 Team Roles** (Captain, Coach, Manager, etc.)
- **Complete player profiles** with batting/bowling stats

### Rankings
- **Team Rankings** for T20I, ODI, Test formats
- **Player Rankings** for batting, bowling, all-rounder categories
- **Multiple formats** and categories for comprehensive testing

### Media Gallery
- **10 Media Items** (photos, videos, documents)
- **5 Media Categories** (Match Photos, Training Videos, etc.)
- **Placeholder images** and thumbnails

### Contact System
- **10 Contact Messages** with different statuses
- **5 Contact Categories** (General, Media, Partnership, etc.)
- **4 Contact Info** entries (Office, Emergency, Media, General)

### User Accounts
- **Admin User**: username `admin`, password `admin123`
- **3 Regular Users**: `user1`, `user2`, `user3` (password: `password123`)

## 🖼️ Image Generation

The script automatically generates placeholder images using PIL (Pillow):
- **News images**: 800x400 pixels
- **Event images**: 600x400 pixels
- **Player photos**: 300x400 pixels
- **Media thumbnails**: 400x300 pixels

Images are saved to the appropriate media directories and properly linked to the database records.

## 🔧 Customization

### Modifying the Data

You can customize the sample data by editing the management command:
```
api/management/commands/create_sample_data.py
```

### Adding More Records

To create more than 10 records per model, modify the data arrays in the command file.

### Custom Images

To use custom images instead of generated placeholders, replace the `create_placeholder_image()` method with your own image loading logic.

## 🐛 Troubleshooting

### Common Issues

1. **"manage.py not found"**
   - Make sure you're running the script from the project root directory

2. **"No module named 'PIL'"**
   - Install Pillow: `pip install Pillow`

3. **Database errors**
   - Ensure migrations are applied: `python manage.py migrate`
   - Check database configuration in `backend/settings.py`

4. **Permission errors**
   - Make sure the media directory is writable
   - Check file permissions for the script

### Clearing Data

If you need to start fresh:
```bash
python manage.py create_sample_data --clear
```

This will delete all existing data before creating new sample data.

## 🔗 Next Steps

After populating the database:

1. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```

2. **Start the Next.js frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the applications**:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:8000/admin
   - API: http://localhost:8000/api/v1/

4. **Test the API endpoints**:
   - News: http://localhost:8000/api/v1/news/
   - Events: http://localhost:8000/api/v1/events/
   - Players: http://localhost:8000/api/v1/players/
   - Rankings: http://localhost:8000/api/v1/team-rankings/

## 📱 Frontend Testing

With the sample data, you can now test:
- ✅ Home page with real data
- ✅ News listing with pagination and search
- ✅ Events page with filters
- ✅ Team page with players and staff
- ✅ Rankings with different categories
- ✅ Media gallery
- ✅ Admin panels with CRUD operations

The React Query hooks will now fetch real data from the API instead of using mock data.

## 🎯 Production Notes

**Important**: This script is for development and testing only. Do not run this on a production database as it will create or overwrite data.

For production deployment:
1. Remove or disable the sample data commands
2. Use real images and content
3. Set up proper user authentication
4. Configure production database settings