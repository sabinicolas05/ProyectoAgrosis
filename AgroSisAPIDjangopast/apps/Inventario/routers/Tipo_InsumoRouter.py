from rest_framework.routers import DefaultRouter
from ..views.Tipo_InsumoViews import Tipo_InsumoViews

Tipo_InsumoRouter = DefaultRouter()
Tipo_InsumoRouter.register(prefix='tipo_insumo', viewset=Tipo_InsumoViews, basename='tipo_insumo')