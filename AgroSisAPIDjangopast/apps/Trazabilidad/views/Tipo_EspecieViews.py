from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Tipo_Especie import Tipo_Especie
from ..serializers.Tipo_EspecieSerializer import Tipo_EspecieSerializer

class Tipo_EspecieViews(ModelViewSet):
    queryset = Tipo_Especie.objects.all()
    serializer_class = Tipo_EspecieSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]