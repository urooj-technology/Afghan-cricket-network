from django.urls import path, include
from rest_framework import routers

# Create a router and register your viewsets with it.
router = routers.DefaultRouter()


urlpatterns = [
    path("", include(router.urls)),  # Include the router URLs   
]
