from rest_framework import serializers
from ..models.Sensor_model import Sensor

class SensorSerializer(serializers.ModelSerializer):
    fk_bancal_nombre = serializers.CharField(source="fk_bancal.nombre", read_only=True)
    fk_tipo_sensor_nombre = serializers.CharField(source="fk_tipo_sensor.nombre", read_only=True)
    fk_configuracion_nombre = serializers.CharField(source="fk_configuracion.nombre", read_only=True)
    fk_cultivo_nombre = serializers.CharField(source="fk_cultivo.nombre", read_only=True)
    valor_min = serializers.DecimalField(source="fk_configuracion.valor_min", max_digits=10, decimal_places=2, read_only=True)
    valor_max = serializers.DecimalField(source="fk_configuracion.valor_max", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Sensor
        fields = [
            "id",
            "fk_bancal", "fk_bancal_nombre",
            "fk_tipo_sensor", "fk_tipo_sensor_nombre",
            "fk_configuracion", "fk_configuracion_nombre", "valor_min", "valor_max",
            "fk_cultivo", "fk_cultivo_nombre",
            "medicion",
        ]
