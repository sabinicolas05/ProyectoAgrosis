from rest_framework.serializers import ModelSerializer
from ..models.Semillero import Semillero

class SemilleroSerializer(ModelSerializer):
    class Meta:
        model = Semillero
        fields = '__all__'