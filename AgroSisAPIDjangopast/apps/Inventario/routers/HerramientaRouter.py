from rest_framework.routers import DefaultRouter
from apps.Inventario.views.HerramientaViews import HerramientaViews  # ✅ Corrección de importación

HerramientaRouter = DefaultRouter()
HerramientaRouter.register(prefix='herramienta', viewset=HerramientaViews, basename='herramienta')
