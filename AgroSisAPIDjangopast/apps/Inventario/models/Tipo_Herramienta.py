from django.db import models

class Tipo_Herramienta(models.Model):
    tipo = models.CharField(max_length=30)
    def __str__(self):
        return self.tipo