from rest_framework.serializers import ModelSerializer
from ..models.Venta import Venta

class VentaSerializer(ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'