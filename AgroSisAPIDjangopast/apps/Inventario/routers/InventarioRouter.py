from rest_framework.routers import DefaultRouter
from ..views.InventarioViews import InventarioViews

InventarioRouter = DefaultRouter()
InventarioRouter.register(prefix='inventario', viewset=InventarioViews, basename='inventario')