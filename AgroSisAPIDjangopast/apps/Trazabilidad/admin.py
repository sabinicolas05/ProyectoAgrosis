from django.contrib import admin
from .models.Actividad import Actividad
from .models.Afeccion import Afeccion
from .models.Asignacion_Actividad import Asignacion_Actividad
from .models.Bancal import Bancal
from .models.Control import Control
from .models.Cultivo import Cultivo
from .models.Especie import Especie
from .models.Lote import Lote
from .models.Notificacion import Notificacion
from .models.Plaga import Plaga
from .models.Semillero import Semillero
from .models.Tipo_Especie import Tipo_Especie
from .models.Tipo_Plaga import Tipo_Plaga
# Register your models here.
admin.site.register(Actividad)
admin.site.register(Afeccion)
admin.site.register(Asignacion_Actividad)
admin.site.register(Bancal)
admin.site.register(Control)
admin.site.register(Cultivo)
admin.site.register(Especie)
admin.site.register(Lote)
admin.site.register(Notificacion)
admin.site.register(Plaga)
admin.site.register(Semillero)
admin.site.register(Tipo_Especie)
admin.site.register(Tipo_Plaga)