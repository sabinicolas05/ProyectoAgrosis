from django.db import models
from .Cultivo import Cultivo
from .Afeccion import Afeccion

class Control(models.Model):
    fk_cultivo = models.ForeignKey(Cultivo,on_delete=models.SET_NULL,null=True)
    fk_afeccion = models.ForeignKey(Afeccion,on_delete=models.SET_NULL,null=True)
    fecha_hora = models.DateTimeField()
    descripcion = models.TextField(max_length=500)
    def __str__(self):
        return self.descripcion