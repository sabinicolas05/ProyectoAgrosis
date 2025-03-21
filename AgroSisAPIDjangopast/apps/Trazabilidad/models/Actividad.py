from django.db import models
from .Bancal import Bancal
from apps.Users.models import Usuario

class Actividad(models.Model):
    fk_usuario = models.ForeignKey(Usuario,on_delete=models.SET_NULL,null=True)
    fk_bancal = models.ForeignKey(Bancal,on_delete=models.SET_NULL,null=True)
    descripcion = models.CharField(max_length=200)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.BooleanField(default=False)
    def __str__(self):
        return self.descripcion