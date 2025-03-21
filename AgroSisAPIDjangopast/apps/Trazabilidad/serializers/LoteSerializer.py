from rest_framework.serializers import ModelSerializer
from ..models.Lote import Lote

class LoteSerializer(ModelSerializer):
    class Meta:
        model = Lote
        fields = '__all__'