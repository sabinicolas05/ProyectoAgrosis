from rest_framework.serializers import ModelSerializer
from ..models.Notificacion import Notificacion

class NotificacionSerializer(ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'