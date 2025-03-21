from django.db import models

class Tipo_Sensor(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.TextField(max_length=500)
    def __str__(self):
        return self.nombre