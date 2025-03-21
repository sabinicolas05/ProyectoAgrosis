from rest_framework.serializers import ModelSerializer
from ..models.Tipo_Herramienta import Tipo_Herramienta

class Tipo_HerramientaSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Herramienta
        fields = '__all__'
