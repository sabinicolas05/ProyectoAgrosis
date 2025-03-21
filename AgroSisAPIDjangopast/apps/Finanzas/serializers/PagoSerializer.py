from rest_framework.serializers import ModelSerializer
from ..models.Pago import Pago

class PagoSerializer(ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'