from rest_framework.serializers import ModelSerializer
from ..models.Tipo_Especie import Tipo_Especie

class Tipo_EspecieSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Especie
        fields = '__all__'