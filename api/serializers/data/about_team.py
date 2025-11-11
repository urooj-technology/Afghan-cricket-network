from rest_framework import serializers
from api.models.data.about_team import AboutTeam
from .base import DataRootSerializer


class AboutTeamSerializer(DataRootSerializer):
    class Meta:
        model = AboutTeam
        fields = '__all__'
