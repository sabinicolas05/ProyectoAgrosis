from rest_framework.serializers import ModelSerializer
from ..models.Inventario import Inventario

class InventarioSerializer(ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'