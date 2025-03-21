from django.db import models
from .Produccion import Produccion

class Venta(models.Model):
    fk_produccion = models.ForeignKey(Produccion,on_delete=models.SET_NULL,null=True)
    precio_unitario = models.IntegerField()
    cantidad_produccion = models.IntegerField()
    fecha = models.DateField()
    def __str__(self):
        return str(self.precio_unitario) + str(self.fecha)