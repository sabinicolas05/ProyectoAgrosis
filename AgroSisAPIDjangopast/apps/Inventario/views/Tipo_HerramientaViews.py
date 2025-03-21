from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Tipo_Herramienta import Tipo_Herramienta
from ..serializers.Tipo_HerramientaSerializer import Tipo_HerramientaSerializer

class Tipo_HerramientaViews(ModelViewSet):
    queryset = Tipo_Herramienta.objects.all()
    serializer_class = Tipo_HerramientaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
