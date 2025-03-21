from rest_framework.serializers import ModelSerializer
from ..models.Cultivo import Cultivo

class CultivoSerializer(ModelSerializer):
    class Meta:
        model = Cultivo
        fields = '__all__'