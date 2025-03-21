from rest_framework.serializers import ModelSerializer
from ..models.Asignacion_Actividad import Asignacion_Actividad

class Asignacion_ActividadSerializer(ModelSerializer):
    class Meta:
        model = Asignacion_Actividad
        fields = '__all__'
