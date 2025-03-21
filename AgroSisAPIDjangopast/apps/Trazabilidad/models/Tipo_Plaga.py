from django.db import models

class Tipo_Plaga(models.Model):
    tipo = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=300)
    def __str__(self):
        return self.tipo