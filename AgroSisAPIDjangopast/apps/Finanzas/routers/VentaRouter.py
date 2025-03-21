from rest_framework.routers import DefaultRouter
from ..views.VentaViews import VentaViews
VentaRouter = DefaultRouter()

VentaRouter.register(prefix='venta',viewset=VentaViews,basename='venta')