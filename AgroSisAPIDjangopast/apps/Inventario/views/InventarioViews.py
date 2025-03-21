from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Inventario import Inventario
from ..serializers.InventarioSerializer import InventarioSerializer

class InventarioViews(ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]