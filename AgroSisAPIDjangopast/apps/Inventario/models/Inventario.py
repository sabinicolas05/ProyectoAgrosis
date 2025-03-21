from django.db import models
from .Herramienta import Herramienta
from .Insumo import Insumo
class Inventario(models.Model):
    fk_herramienta = models.ForeignKey(Herramienta,on_delete=models.SET_NULL,null=True)
    fk_insumo = models.ForeignKey(Insumo,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return str(self.fk_herramienta) + str(self.fk_insumo)