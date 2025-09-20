from rest_framework import serializers
from api.models.data.media import Media, MediaCategory, MediaGallery
from .base import DataRootSerializer


class MediaCategorySerializer(DataRootSerializer):
    class Meta:
        model = MediaCategory
        fields = '__all__'


class MediaListSerializer(DataRootSerializer):
    media_category_name = serializers.CharField(source='media_category.name', read_only=True)
    
    class Meta:
        model = Media
        fields = ['id', 'title', 'slug', 'media_type', 'category',
                 'media_category_name', 'image', 'thumbnail', 'views',
                 'is_featured', 'is_published', 'created_at']


class MediaDetailSerializer(DataRootSerializer):
    media_category = MediaCategorySerializer(read_only=True)
    
    class Meta:
        model = Media
        fields = '__all__'


class MediaGallerySerializer(DataRootSerializer):
    item_count = serializers.ReadOnlyField()
    
    class Meta:
        model = MediaGallery
        fields = '__all__'