from rest_framework import serializers
from ..models.Plaga import Plaga

class PlagaSerializer(serializers.ModelSerializer):
    fk_tipo_plaga_tipo = serializers.CharField(source="fk_tipo_plaga.tipo", read_only=True)  # Esto accede al campo 'tipo' del modelo Tipo_Plaga

    class Meta:
        model = Plaga
        fields = [
            'id', 'nombre', 'fk_tipo_plaga', 'fk_tipo_plaga_tipo'  # Incluye tanto el ID de fk_tipo_plaga como el campo 'tipo'
        ]
