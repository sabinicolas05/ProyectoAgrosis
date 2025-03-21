from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Plaga import Plaga
from ..serializers.PlagaSerializer import PlagaSerializer

class PlagaViews(ModelViewSet):
    queryset = Plaga.objects.all()
    serializer_class = PlagaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]