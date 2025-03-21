from rest_framework.serializers import ModelSerializer
from ..models.Plaga import Plaga

class PlagaSerializer(ModelSerializer):
    class Meta:
        model = Plaga
        fields = '__all__'