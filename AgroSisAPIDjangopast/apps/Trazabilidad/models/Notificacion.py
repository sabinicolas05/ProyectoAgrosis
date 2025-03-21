from django.db import models
from .Actividad import Actividad
from apps.Users.models import Usuario

class Notificacion(models.Model):
    fk_actividad = models.ForeignKey(Actividad,on_delete=models.SET_NULL,null=True)
    fk_usuario = models.ForeignKey(Usuario,on_delete=models.SET_NULL,null=True)
    nombre = models.CharField(max_length=20)
    descripcion = models.TextField(max_length=300)
    fecha_hora = models.DateTimeField()
    def __str__(self):
        return self.nombre