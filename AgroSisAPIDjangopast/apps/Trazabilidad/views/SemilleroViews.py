from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Semillero import Semillero
from ..serializers.SemilleroSerializer import SemilleroSerializer

class SemilleroViews(ModelViewSet):
    queryset = Semillero.objects.all()
    serializer_class = SemilleroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]