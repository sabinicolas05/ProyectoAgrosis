from rest_framework.viewsets import ModelViewSet
from ..models.Configuracion_model import Configuracion
from ..serializers.ConfiguracionSerializer import ConfiguracionSerializer
from rest_framework.permissions import IsAuthenticated

class ConfiguracionViews(ModelViewSet):
    queryset = Configuracion.objects.all()
    serializer_class = ConfiguracionSerializer
    permission_classes = [IsAuthenticated]