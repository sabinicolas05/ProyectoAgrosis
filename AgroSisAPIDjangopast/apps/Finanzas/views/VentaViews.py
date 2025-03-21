from rest_framework.viewsets import ModelViewSet
from ..models.Venta import Venta
from ..serializers.VentaSerializer import VentaSerializer
from rest_framework.permissions import IsAdminUser

class VentaViews(ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    permission_classes = [IsAdminUser]