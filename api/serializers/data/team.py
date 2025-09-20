from rest_framework import serializers
from api.models.data.team import Player, TeamMember, TeamRole
from .base import DataRootSerializer


class TeamRoleSerializer(DataRootSerializer):
    class Meta:
        model = TeamRole
        fields = '__all__'


class PlayerListSerializer(DataRootSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'slug', 'jersey_number', 'role', 'age', 
                 'photo', 'matches_played', 'runs_scored', 'wickets_taken',
                 'status', 'is_captain', 'is_vice_captain', 'is_featured']


class PlayerDetailSerializer(DataRootSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class TeamMemberListSerializer(DataRootSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'slug', 'position', 'member_type', 
                 'role_name', 'photo', 'join_date', 'is_active', 'order']


class TeamMemberDetailSerializer(DataRootSerializer):
    role = TeamRoleSerializer(read_only=True)
    
    class Meta:
        model = TeamMember
        fields = '__all__'