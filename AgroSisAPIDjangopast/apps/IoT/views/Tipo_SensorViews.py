from rest_framework.viewsets import ModelViewSet
from ..models.Tipo_Sensor_model import Tipo_Sensor
from ..serializers.Tipo_SensorSerializer import Tipo_SensorSerializer
from rest_framework.permissions import IsAuthenticated

class Tipo_SensorViews(ModelViewSet):
    queryset = Tipo_Sensor.objects.all()
    serializer_class = Tipo_SensorSerializer
    permission_classes = [IsAuthenticated]