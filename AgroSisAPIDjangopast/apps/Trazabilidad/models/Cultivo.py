from django.db import models
from .Semillero import Semillero
from .Especie import Especie

class Cultivo(models.Model):
    fk_semillero = models.ForeignKey(Semillero,on_delete=models.SET_NULL,null=True)
    fk_especie = models.ForeignKey(Especie,on_delete=models.SET_NULL,null=True)
    nombre = models.CharField(max_length=20)
    descripcion = models.TextField(max_length=300)
    cantidad = models.IntegerField()
    fecha_siembra = models.DateField()
    def __str__(self):
        return self.nombre