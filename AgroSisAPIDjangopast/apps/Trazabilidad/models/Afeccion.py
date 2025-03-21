from django.db import models
from .Bancal import Bancal
from .Plaga import Plaga

class Afeccion(models.Model):
    fk_bancal = models.ForeignKey(Bancal,on_delete=models.SET_NULL,null=True)
    fk_plaga = models.ForeignKey(Plaga,on_delete=models.SET_NULL,null=True)
    fecha = models.DateField()
    descripcion = models.TextField(max_length=500)
    def __str__(self):
        return self.descripcion