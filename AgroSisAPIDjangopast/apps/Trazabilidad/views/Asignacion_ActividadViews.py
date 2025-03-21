from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Asignacion_Actividad import Asignacion_Actividad
from ..serializers.Asignacion_ActividadSerializer import Asignacion_ActividadSerializer

class Asignacion_ActividadViews(ModelViewSet):
    queryset = Asignacion_Actividad.objects.all()
    serializer_class = Asignacion_ActividadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
