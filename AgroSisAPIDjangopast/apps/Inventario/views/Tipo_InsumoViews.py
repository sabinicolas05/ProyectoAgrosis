from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Tipo_Insumo import Tipo_Insumo
from ..serializers.Tipo_InsumoSerializer import Tipo_InsumoSerializer

class Tipo_InsumoViews(ModelViewSet):
    queryset = Tipo_Insumo.objects.all()
    serializer_class = Tipo_InsumoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]