from django.db import models

class Tipo_Especie(models.Model):
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=300)
    tiempo_crecimiento = models.IntegerField()
    def __str__(self):
        return self.tipo