from rest_framework.viewsets import ModelViewSet
from ..models.Pago import Pago
from ..serializers.PagoSerializer import PagoSerializer
from rest_framework.permissions import IsAdminUser

class PagoViews(ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = [IsAdminUser]