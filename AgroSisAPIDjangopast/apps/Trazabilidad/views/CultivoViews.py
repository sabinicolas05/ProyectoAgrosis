from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Cultivo import Cultivo
from ..serializers.CultivoSerializer import CultivoSerializer

class CultivoViews(ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
