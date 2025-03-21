from rest_framework.serializers import ModelSerializer
from ..models.Tipo_Insumo import Tipo_Insumo

class Tipo_InsumoSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Insumo
        fields = '__all__'