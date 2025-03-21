from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.Control import Control
from ..serializers.ControlSerializer import ControlSerializer

class ControlViews(ModelViewSet):
    queryset = Control.objects.all()
    serializer_class = ControlSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
