from rest_framework import serializers
from api.models.data.news import News, NewsCategory
from .base import DataRootSerializer


class NewsCategorySerializer(DataRootSerializer):
    class Meta:
        model = NewsCategory
        fields = '__all__'


class NewsListSerializer(DataRootSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = News
        fields = ['id', 'title', 'slug', 'excerpt', 'image', 'author_name', 
                 'category_name', 'status', 'is_featured', 'views', 
                 'published_at', 'created_at']


class NewsDetailSerializer(DataRootSerializer):
    author = serializers.StringRelatedField(read_only=True)
    category = NewsCategorySerializer(read_only=True)
    
    class Meta:
        model = News
        fields = '__all__'