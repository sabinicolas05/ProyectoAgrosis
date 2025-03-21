from django.db import models
from apps.Trazabilidad.models.Bancal import Bancal
from apps.IoT.models.Sensor_model import Sensor


class DatosMeteorologicos(models.Model):
    fk_id_sensor = models.ForeignKey(Sensor, on_delete=models.SET_NULL, null=True, related_name="mediciones")
    fk_id_bancal = models.ForeignKey(Bancal, on_delete=models.SET_NULL, null=True, related_name="mediciones")
    valor_medicion = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_medicion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Nombre del sensor: {self.fk_id_sensor.fk_tipo_sensor.nombre if self.fk_id_sensor else 'Desconocido'} | Era: {self.fk_id_bancal}"

    
