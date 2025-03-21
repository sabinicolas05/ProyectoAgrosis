from rest_framework.viewsets import ModelViewSet
from ..models.Sensor_model import Sensor
from ..serializers.SensorSerializer import SensorSerializer
#from rest_framework.permissions import IsAuthenticated

class SensorViews(ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    #permission_classes = [IsAuthenticated]