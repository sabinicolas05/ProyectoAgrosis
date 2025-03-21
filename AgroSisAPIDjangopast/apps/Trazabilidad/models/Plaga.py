from django.db import models
from .Tipo_Plaga import Tipo_Plaga

class Plaga(models.Model):
    fk_tipo_plaga = models.ForeignKey(Tipo_Plaga,on_delete=models.SET_NULL,null=True)
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre