# Django Setup Template

A professional Django project template with pre-configured settings and best practices for quickly bootstrapping new Django applications. This template includes essential configurations, security settings, and common functionalities to help you start your Django projects faster and more efficiently.

## 🚀 Features

- **Modern Django Setup**: Built with Django 5.1.5 and Python 3.x
- **REST API Ready**: Includes Django REST Framework with Knox authentication
- **Advanced User Authentication**: Custom user model with enhanced authentication features
- **Security Focused**: Pre-configured security settings and environment variable management
- **Database Flexibility**: 
  - SQLite configuration for development
  - Ready-to-use MySQL/PostgreSQL configuration (commented)
  - Database optimization settings
- **CORS Configuration**: Pre-configured CORS settings for frontend integration
- **Email Configuration**: Complete email setup with environment variables
- **Static & Media Files**: Properly configured static and media file handling
- **API Documentation**: Ready-to-use API app structure
- **Code Quality**: Black formatter integration for consistent code style

## 📋 Prerequisites

- Python 3.x
- pip (Python package manager)
- Virtual environment (recommended)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mansoorfaizi/django-setup-template.git
   cd django-setup-template
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```env
   SECRET_KEY=your_secret_key
   DEBUG=True
   STATIC_URL=/static/
   STATIC_ROOT=static
   MEDIA_URL=/media/
   MEDIA_ROOT=media

   # Database Configuration (if using MySQL/PostgreSQL)
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=3306

   # Email Configuration
   EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USE_SSL=True
   EMAIL_HOST_USER=your_email@gmail.com
   EMAIL_HOST_PASSWORD=your_app_password
   DEFAULT_FROM_EMAIL=your_email@gmail.com
   EMAIL_TIMEOUT=30

   # Token Configuration
   TOKEN_EXPIRY_DAYS=7
   TOKEN_LIMIT=0
   ```

5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

## 🏗️ Project Structure

```
django-setup-template/
├── account/            # Custom user authentication app
├── api/               # Main API application
├── backend/          # Project settings and configuration
├── static/           # Static files directory
├── manage.py         # Django management script
└── requirements.txt  # Project dependencies
```

## ⚙️ Configuration

### Database
- Default: SQLite (development)
- Prepared configurations for MySQL/PostgreSQL (commented in settings.py)
- Optimized database connection settings

### Authentication
- Custom User model in `account` app
- Knox token authentication
- Configurable token expiry and limits

### Security
- Environment variable-based configuration
- CORS settings for frontend integration
- Proper security middleware setup

### API Features
- REST Framework integration
- Django Filter backend
- Proper API versioning structure

## 📝 Usage

1. Clone this template for new projects
2. Configure your `.env` file
3. Modify settings as needed in `backend/settings.py`
4. Start building your apps!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Support

For support, please open an issue in the GitHub repository.