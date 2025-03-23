from rest_framework import serializers
from apps.Trazabilidad.models.Actividad import Actividad 

class ActividadSerializer(serializers.ModelSerializer):
    fk_usuario_nombre = serializers.CharField(source="fk_usuario.username", read_only=True)
    fk_bancal_nombre = serializers.CharField(source="fk_bancal.nombre", read_only=True)

    class Meta:
        model = Actividad
        fields = ["id", "descripcion", "fecha_inicio", "fecha_fin", "estado", 
                  "fk_usuario", "fk_usuario_nombre", "fk_bancal", "fk_bancal_nombre"]
