from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Insumo import Insumo
from ..serializers.InsumoSerializer import InsumoSerializer

class InsumoViews(ModelViewSet):
    queryset = Insumo.objects.all()
    serializer_class = InsumoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
