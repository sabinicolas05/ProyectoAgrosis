from rest_framework.routers import DefaultRouter
from ..views.CultivoViews import CultivoViews

CultivoRouter = DefaultRouter()
CultivoRouter.register(prefix='cultivo', viewset=CultivoViews, basename='cultivo')