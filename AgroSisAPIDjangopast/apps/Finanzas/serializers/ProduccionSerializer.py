from rest_framework.serializers import ModelSerializer
from ..models.Produccion import Produccion

class ProduccionSerializer(ModelSerializer):
    class Meta:
        model = Produccion
        fields = '__all__'