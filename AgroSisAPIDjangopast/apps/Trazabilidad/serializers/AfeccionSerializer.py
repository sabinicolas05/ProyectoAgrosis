from rest_framework.serializers import ModelSerializer
from ..models.Afeccion import Afeccion

class AfeccionSerializer(ModelSerializer):
    class Meta:
        model = Afeccion
        fields = '__all__'