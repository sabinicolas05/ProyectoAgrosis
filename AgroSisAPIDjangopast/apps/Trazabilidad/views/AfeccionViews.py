from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Afeccion import Afeccion
from ..serializers.AfeccionSerializer import AfeccionSerializer

class AfeccionViews(ModelViewSet):
    queryset = Afeccion.objects.all()
    serializer_class = AfeccionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]