from django.db import models
from apps.Trazabilidad.models.Cultivo import Cultivo
from apps.Users.models import Usuario

class Produccion(models.Model):
    fk_cultivo = models.ForeignKey(Cultivo,on_delete=models.SET_NULL,null=True)
    fk_usuario = models.ForeignKey(Usuario,on_delete=models.SET_NULL,null=True)
    nombre = models.CharField(max_length=20)
    precio = models.IntegerField()
    contenido = models.IntegerField()
    unidades = models.IntegerField()
    def __str__(self):
        return self.nombre