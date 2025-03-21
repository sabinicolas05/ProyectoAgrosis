from rest_framework.serializers import ModelSerializer
from ..models.Bancal import Bancal

class BancalSerializer(ModelSerializer):
    class Meta:
        model = Bancal
        fields = '__all__'
