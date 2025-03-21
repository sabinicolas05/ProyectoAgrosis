from rest_framework.routers import DefaultRouter
from ..views.Tipo_EspecieViews import Tipo_EspecieViews

Tipo_EspecieRouter = DefaultRouter()
Tipo_EspecieRouter.register(prefix='tipo_especie', viewset=Tipo_EspecieViews, basename='tipo_especie')