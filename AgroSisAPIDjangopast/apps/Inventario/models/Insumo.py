from django.db import models
from .Tipo_Insumo import Tipo_Insumo

class Insumo(models.Model):
    fk_tipo_insumo = models.ForeignKey(Tipo_Insumo,on_delete=models.SET_NULL,null=True)
    cantidad = models.IntegerField()
    precio = models.IntegerField()
    tipo_empacado = models.CharField(max_length=200)
    tipo = models.CharField(max_length=100)
    unidadMedida = models.CharField(max_length=10)
    def __str__(self):
        return self.tipo