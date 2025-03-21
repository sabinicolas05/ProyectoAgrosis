from rest_framework.routers import DefaultRouter
from ..views.InsumoViews import InsumoViews

InsumoRouter = DefaultRouter()
InsumoRouter.register(prefix='insumo', viewset=InsumoViews, basename='insumo')
