from rest_framework.serializers import ModelSerializer
from ..models.Actividad import Actividad

class ActividadSerializer(ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'