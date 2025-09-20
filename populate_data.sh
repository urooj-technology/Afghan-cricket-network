#!/bin/bash

echo "🚀 Afghan Cricket Network - Database Population Script"
echo "======================================================"

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: manage.py not found. Please run this script from the project root directory."
    exit 1
fi

# Check if virtual environment is activated
if [ -z "$VIRTUAL_ENV" ]; then
    echo "⚠️  Warning: No virtual environment detected."
    echo "It's recommended to activate your virtual environment first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Ask if user wants to clear existing data
echo
read -p "🗑️  Do you want to clear existing data first? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Clearing existing data and creating new sample data..."
    python manage.py create_sample_data --clear
else
    echo "Creating sample data (keeping existing data)..."
    python manage.py create_sample_data
fi

# Check if command was successful
if [ $? -eq 0 ]; then
    echo
    echo "✅ Database populated successfully!"
    echo
    echo "📊 Sample data created:"
    echo "   • 10 News articles with images"
    echo "   • 10 Events with images"
    echo "   • 10 Players with photos"
    echo "   • 10 Team members with photos"
    echo "   • 5 Cricket venues"
    echo "   • Team and Player rankings"
    echo "   • 10 Media items with images/thumbnails"
    echo "   • 10 Contact messages"
    echo "   • Contact information"
    echo
    echo "🔗 Next steps:"
    echo "   • python manage.py runserver (start Django server)"
    echo "   • cd frontend && npm run dev (start Next.js frontend)"
    echo "   • Visit http://localhost:3000 to see the frontend"
    echo "   • Visit http://localhost:8000/admin to access admin panel"
    echo
    echo "🔑 Default admin credentials:"
    echo "   Username: admin"
    echo "   Password: admin123"
else
    echo
    echo "❌ Error occurred during data population."
    echo "Please check the error messages above and ensure:"
    echo "   • Database is properly configured"
    echo "   • Migrations have been applied (python manage.py migrate)"
    echo "   • All required packages are installed (pip install -r requirements.txt)"
fi