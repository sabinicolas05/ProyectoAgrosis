from rest_framework.routers import DefaultRouter
from ..views.ActividadViews import ActividadViews

ActividadRouter = DefaultRouter()
ActividadRouter.register(prefix='actividad',viewset=ActividadViews,basename='actividad')