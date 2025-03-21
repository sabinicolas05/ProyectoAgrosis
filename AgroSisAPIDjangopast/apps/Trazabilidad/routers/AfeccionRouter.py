from rest_framework.routers import DefaultRouter
from ..views.AfeccionViews import AfeccionViews

AfeccionRouter = DefaultRouter()
AfeccionRouter.register(prefix='afeccion', viewset=AfeccionViews, basename='afeccion')