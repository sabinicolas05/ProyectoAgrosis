from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Bancal import Bancal
from ..serializers.BancalSerializer import BancalSerializer

class BancalViews(ModelViewSet):
    queryset = Bancal.objects.all()
    serializer_class = BancalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]