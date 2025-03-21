from rest_framework.routers import DefaultRouter
from ..views.Asignacion_ActividadViews import Asignacion_ActividadViews

Asignacion_ActividadRouter = DefaultRouter()
Asignacion_ActividadRouter.register(prefix='asignacion_actividad', viewset=Asignacion_ActividadViews, basename='asignacion_actividad')
