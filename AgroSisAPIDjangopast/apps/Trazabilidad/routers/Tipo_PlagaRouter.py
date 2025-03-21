from rest_framework.routers import DefaultRouter
from ..views.Tipo_PlagaViews import Tipo_PlagaViews

Tipo_PlagaRouter = DefaultRouter()
Tipo_PlagaRouter.register(prefix='tipo_plaga', viewset=Tipo_PlagaViews, basename='tipo_plaga')