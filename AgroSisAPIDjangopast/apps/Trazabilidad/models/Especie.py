from django.db import models
from .Tipo_Especie import Tipo_Especie

class Especie(models.Model):
    fk_tipo_especie = models.ForeignKey(Tipo_Especie,on_delete=models.SET_NULL,null=True)
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre