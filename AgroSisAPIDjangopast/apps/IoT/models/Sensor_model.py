from django.db import models
from .Tipo_Sensor_model import Tipo_Sensor
from .Configuracion_model import Configuracion
from apps.Trazabilidad.models.Bancal import Bancal
from apps.Trazabilidad.models.Cultivo import Cultivo

class Sensor(models.Model):
    fk_bancal = models.ForeignKey(Bancal, on_delete=models.SET_NULL, null=True)
    fk_tipo_sensor = models.ForeignKey(Tipo_Sensor, on_delete=models.SET_NULL, null=True)
    fk_configuracion = models.ForeignKey(Configuracion, on_delete=models.SET_NULL, null=True)
    fk_cultivo = models.ForeignKey(Cultivo, on_delete=models.SET_NULL, null=True)
    medicion = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"Tipo: {self.fk_tipo_sensor}, Bancal: {self.fk_bancal}, Cultivo: {self.fk_cultivo}, Config: {self.fk_configuracion}, Medición: {self.medicion}"
