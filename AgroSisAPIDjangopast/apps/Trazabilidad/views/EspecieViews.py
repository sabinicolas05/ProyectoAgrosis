from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Especie import Especie
from ..serializers.EspecieSerializer import EspecieSerializer

class EspecieViews(ModelViewSet):
    queryset = Especie.objects.all()
    serializer_class = EspecieSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]