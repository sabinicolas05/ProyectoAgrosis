from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Tipo_Plaga import Tipo_Plaga
from ..serializers.Tipo_PlagaSerializer import Tipo_PlagaSerializer

class Tipo_PlagaViews(ModelViewSet):
    queryset = Tipo_Plaga.objects.all()
    serializer_class = Tipo_PlagaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]