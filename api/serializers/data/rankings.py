from rest_framework import serializers
from api.models.data.rankings import TeamRanking, PlayerRanking, GeneralRanking, RankingCategory
from .base import DataRootSerializer


class RankingCategorySerializer(DataRootSerializer):
    class Meta:
        model = RankingCategory
        fields = '__all__'


class TeamRankingSerializer(DataRootSerializer):
    class Meta:
        model = TeamRanking
        fields = '__all__'


class PlayerRankingSerializer(DataRootSerializer):
    player_name = serializers.CharField(source='player.name', read_only=True)
    
    class Meta:
        model = PlayerRanking
        fields = '__all__'


class GeneralRankingSerializer(DataRootSerializer):
    class Meta:
        model = GeneralRanking
        fields = '__all__'