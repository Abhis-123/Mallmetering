from rest_framework import serializers
from Superadmin.models import SupervisorModel
from .models import Connections

"""class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeterConnections
        fields = ('id', 'username', 'meter_name')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeterConnections
        fields = ('id', 'username', 'meter_name')

    def create(self, validated_data):
        user=MeterConnections.objects.create(username=validated_data['username'],meter_name=validated_data['meter_name'])
        

        return user """

class SupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorModel
        fields = ('id', 'username', 'email','password')

class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connections
        fields = ('id', 'username', 'meter_name')


        
