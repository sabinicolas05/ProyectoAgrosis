from rest_framework.serializers import ModelSerializer
from ..models.Insumo import Insumo

class InsumoSerializer(ModelSerializer):
    class Meta:
        model = Insumo
        fields = '__all__'