from django.contrib import admin
from .models.Herramienta import Herramienta
from .models.Insumo import Insumo
from .models.Inventario import Inventario
from .models.Tipo_Herramienta import Tipo_Herramienta
from .models.Tipo_Insumo import Tipo_Insumo
# Register your models here.
admin.site.register(Herramienta)
admin.site.register(Insumo)
admin.site.register(Inventario)
admin.site.register(Tipo_Herramienta)
admin.site.register(Tipo_Insumo)