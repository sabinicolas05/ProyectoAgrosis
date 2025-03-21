from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Actividad import Actividad
from ..serializers.ActividadSerializer import ActividadSerializer

class ActividadViews(ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]