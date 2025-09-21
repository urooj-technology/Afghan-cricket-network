import os
from pathlib import Path
from decouple import config
from datetime import timedelta
import pymysql
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default=[], cast=lambda v: [s.strip() for s in v.split(',')])


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework.authtoken",
    # build-in application
    "corsheaders",
    "rest_framework",
    "django_filters",
    'knox',
    # my application
    "api",
    "account",
]

# Caching Configuration
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
        'TIMEOUT': 300,
        'OPTIONS': {
            'MAX_ENTRIES': 1000,
            'CULL_FREQUENCY': 3,
        }
    }
}

# Session Configuration
SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 86400  # 24 hours

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, 'api', 'templates'),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "OPTIONS": {
            "timeout": 20,
            "check_same_thread": False,
        },
    }
}

# Database connection pooling
DATABASES["default"]["CONN_MAX_AGE"] = 60

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

pymysql.install_as_MySQLdb()

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.mysql",
#         "NAME": config('DB_NAME'),  # This will read 'my_db' from your .env file
#         "USER": config('DB_USER'),
#         "PASSWORD": config('DB_PASSWORD'),
#         "HOST": config('DB_HOST'),
#         "PORT": config('DB_PORT'),
#         "OPTIONS": {
#             "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
#             "charset": "utf8mb4",
#             "use_unicode": True,
#             "sql_mode": "traditional",
#         }
#     }
# }

# Add Database optimization settings
# CONN_MAX_AGE = config("DB_CONN_MAX_AGE", default=60, cast=int)
# DATABASE_CONNECT_TIMEOUT = config("DB_CONNECT_TIMEOUT", default=60, cast=int)
# DATABASES["default"]["CONN_MAX_AGE"] = CONN_MAX_AGE
# DATABASES["default"]["OPTIONS"]["connect_timeout"] = DATABASE_CONNECT_TIMEOUT
# ATOMIC_REQUESTS = True



# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = config("STATIC_URL")
STATIC_ROOT = config("STATIC_ROOT")

MEDIA_URL = config("MEDIA_URL")
MEDIA_ROOT = config("MEDIA_ROOT")

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS
CORS_ALLOW_ALL_ORIGINS = config("CORS_ALLOW_ALL_ORIGINS", default=True, cast=bool)
CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", default=[], cast=lambda v: [s.strip() for s in v.split(',')])


# REST Framework Configuration
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "api.views.data.pagination.OptimizedPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    # Throttling disabled for development
    # "DEFAULT_THROTTLE_CLASSES": [
    #     "rest_framework.throttling.AnonRateThrottle",
    #     "rest_framework.throttling.UserRateThrottle",
    # ],
    # "DEFAULT_THROTTLE_RATES": {
    #     "anon": "10000/hour",
    #     "user": "20000/hour",
    # },
}

# Email Configuration
EMAIL_BACKEND = config('EMAIL_BACKEND')
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', cast=int)
EMAIL_USE_SSL = config('EMAIL_USE_SSL', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default=EMAIL_HOST_USER)
EMAIL_TIMEOUT = config('EMAIL_TIMEOUT', default=30, cast=int)

# Add Knox settings
REST_KNOX = {
    'TOKEN_TTL': timedelta(days=config('TOKEN_EXPIRY_DAYS', default=7, cast=int)),
    'TOKEN_LIMIT_PER_USER': config('TOKEN_LIMIT', default=0, cast=int),
    'AUTO_REFRESH': True,
}

# File Upload Settings
MAX_UPLOAD_SIZE = config("MAX_UPLOAD_SIZE")
ALLOWED_UPLOAD_EXTENSIONS = config("ALLOWED_UPLOAD_EXTENSIONS").split(",")

# site address
SITE_ADDRESS = config("SITE_ADDRESS")
