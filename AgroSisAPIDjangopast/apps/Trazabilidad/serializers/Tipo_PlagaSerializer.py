from rest_framework.serializers import ModelSerializer
from ..models.Tipo_Plaga import Tipo_Plaga

class Tipo_PlagaSerializer(ModelSerializer):
    class Meta:
        model = Tipo_Plaga
        fields = '__all__'