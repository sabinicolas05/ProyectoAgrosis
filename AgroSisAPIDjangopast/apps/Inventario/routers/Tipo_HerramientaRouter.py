from rest_framework.routers import DefaultRouter
from ..views.Tipo_HerramientaViews import Tipo_HerramientaViews

Tipo_HerramientaRouter = DefaultRouter()
Tipo_HerramientaRouter.register(prefix='tipo_herramienta', viewset=Tipo_HerramientaViews, basename='tipo_herramienta')