from rest_framework.viewsets import ModelViewSet
from ..models.Residuo import Residuo
from ..serializers.ResiduoSerializer import ResiduoSerializer
from rest_framework.permissions import IsAdminUser

class ResiduoViews(ModelViewSet):
    queryset = Residuo.objects.all()
    serializer_class = ResiduoSerializer
    permission_classes = [IsAdminUser]