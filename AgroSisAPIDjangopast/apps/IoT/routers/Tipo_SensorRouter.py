from rest_framework.routers import DefaultRouter
from ..views.Tipo_SensorViews import Tipo_SensorViews

Tipo_SensorRouter = DefaultRouter()
Tipo_SensorRouter.register(prefix='tiposensor',viewset=Tipo_SensorViews,basename='tiposensor')