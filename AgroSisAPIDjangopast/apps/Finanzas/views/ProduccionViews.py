from rest_framework.viewsets import ModelViewSet
from ..models.Produccion import Produccion
from ..serializers.ProduccionSerializer import ProduccionSerializer
from rest_framework.permissions import IsAdminUser

class ProduccionViews(ModelViewSet):
    queryset = Produccion.objects.all()
    serializer_class = ProduccionSerializer
    permission_classes = [IsAdminUser]