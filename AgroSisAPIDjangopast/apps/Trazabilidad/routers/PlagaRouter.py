from rest_framework.routers import DefaultRouter
from ..views.PlagaViews import PlagaViews

PlagaRouter = DefaultRouter()
PlagaRouter.register(prefix='plaga', viewset=PlagaViews, basename='plaga')
