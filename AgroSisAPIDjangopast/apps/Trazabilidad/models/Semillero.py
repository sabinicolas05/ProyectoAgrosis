from django.db import models
from .Lote import Lote
from .Especie import Especie

class Semillero(models.Model):
    fk_especie = models.ForeignKey(Especie,on_delete=models.SET_NULL,null=True)
    fk_lote = models.ForeignKey(Lote,on_delete=models.SET_NULL,null=True)
    nombre_semilla = models.CharField(max_length=50)
    fecha_siembra = models.DateField()
    fecha_estimada = models.DateField()
    unidades = models.IntegerField()
    def __str__(self):
        return self.nombre_semilla