from rest_framework.routers import DefaultRouter
from ..views.DatosMeteViews import DatosMeteorologicosViewSet

RouterDatos = DefaultRouter()
RouterDatos.register(prefix='datosmeteorologicos',viewset=DatosMeteorologicosViewSet,basename='datosmeteorologicos')