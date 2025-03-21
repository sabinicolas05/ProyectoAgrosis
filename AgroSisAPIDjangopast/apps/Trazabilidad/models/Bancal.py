from django.db import models
from .Lote import Lote
from .Cultivo import Cultivo

class Bancal(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=500)
    fk_lote = models.ForeignKey(Lote,on_delete=models.SET_NULL,null=True)
    fk_cultivo = models.ForeignKey(Cultivo,on_delete=models.SET_NULL,null=True)
    ubicacion = models.CharField(max_length=50)
    def __str__(self):
        return self.ubicacion