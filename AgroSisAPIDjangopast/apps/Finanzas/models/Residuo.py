from django.db import models
from apps.Trazabilidad.models.Cultivo import Cultivo

class Residuo(models.Model):
    cantidad = models.IntegerField()
    tipo_residuo = models.IntegerField()
    fk_cultivo = models.ForeignKey(Cultivo,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return str(self.tipo_residuo) + str(self.cantidad)