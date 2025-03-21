from django.db import models

class Lote(models.Model):
    nombre = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=200)
    ubicacion = models.FloatField()
    def __str__(self):
        return self.nombre