from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Herramienta import Herramienta
from ..serializers.HerramientaSerializer import HerramientaSerializer

class HerramientaViews(ModelViewSet):
    queryset = Herramienta.objects.all()
    serializer_class = HerramientaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]