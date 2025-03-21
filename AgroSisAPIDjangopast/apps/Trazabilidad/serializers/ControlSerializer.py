from rest_framework.serializers import ModelSerializer
from ..models.Control import Control

class ControlSerializer(ModelSerializer):
    class Meta:
        model = Control
        fields = '__all__'