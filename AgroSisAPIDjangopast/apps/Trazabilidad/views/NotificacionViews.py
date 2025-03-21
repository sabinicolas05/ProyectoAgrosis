from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Notificacion import Notificacion
from ..serializers.NotificacionSerializer import NotificacionSerializer

class NotificacionViews(ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]