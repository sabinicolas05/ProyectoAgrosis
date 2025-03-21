from django.db import models
from .Tipo_Herramienta import Tipo_Herramienta

class Herramienta(models.Model):
    fk_tipo_herramienta = models.ForeignKey(Tipo_Herramienta, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=100)
    unidades = models.IntegerField()
    precioCU = models.DecimalField(max_digits=10, decimal_places=2)  # ✅ Correcto
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre  # ✅ Corregido
