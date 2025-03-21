from django.contrib import admin
from .models.Pago import Pago
from .models.Produccion import Produccion
from .models.Residuo import Residuo
from .models.Venta import Venta
# Register your models here.
admin.site.register(Pago)
admin.site.register(Produccion)
admin.site.register(Residuo)
admin.site.register(Venta)