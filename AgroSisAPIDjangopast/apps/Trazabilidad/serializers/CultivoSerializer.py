from rest_framework import serializers
from ..models.Cultivo import Cultivo

class CultivoSerializer(serializers.ModelSerializer):
    fk_especie_nombre = serializers.CharField(source="fk_especie.nombre", read_only=True)
    fk_semillero_nombre = serializers.CharField(source="fk_semillero.nombre_semilla", read_only=True)

    class Meta:
        model = Cultivo
        fields = [
            'id', 'nombre', 'descripcion', 'cantidad', 'fecha_siembra', 
            'fk_especie', 'fk_especie_nombre', 'fk_semillero', 'fk_semillero_nombre'
        ]
