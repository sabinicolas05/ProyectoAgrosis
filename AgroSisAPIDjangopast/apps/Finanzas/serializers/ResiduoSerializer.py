from rest_framework.serializers import ModelSerializer
from ..models.Residuo import Residuo

class ResiduoSerializer(ModelSerializer):
    class Meta:
        model = Residuo
        fields = '__all__'