from django.db import models
from .Actividad import Actividad
from apps.Inventario.models.Inventario import Inventario
from apps.Users.models import Usuario

class Asignacion_Actividad(models.Model):
    fk_actividad = models.ForeignKey(Actividad,on_delete=models.SET_NULL,null=True)
    fk_inventario = models.ForeignKey(Inventario,on_delete=models.SET_NULL,null=True)
    fk_usuario = models.ForeignKey(Usuario,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return str(self.fk_usuario) + str(self.fk_actividad) + str(self.fk_inventario)