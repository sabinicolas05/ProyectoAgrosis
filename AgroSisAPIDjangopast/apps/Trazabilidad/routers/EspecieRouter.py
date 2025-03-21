from rest_framework.routers import DefaultRouter
from ..views.EspecieViews import EspecieViews

EspecieRouter = DefaultRouter()
EspecieRouter.register(prefix='especie', viewset=EspecieViews, basename='especie')