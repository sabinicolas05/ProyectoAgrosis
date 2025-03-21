from django.contrib import admin

from .models.Sensor_model import Sensor
from .models.Configuracion_model import Configuracion
from .models.Tipo_Sensor_model import Tipo_Sensor

# Register your models here.

admin.site.register(Sensor)
admin.site.register(Configuracion)
admin.site.register(Tipo_Sensor)