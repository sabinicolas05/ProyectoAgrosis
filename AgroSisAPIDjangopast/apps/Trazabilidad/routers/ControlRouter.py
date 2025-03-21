from rest_framework.routers import DefaultRouter
from ..views.ControlViews import ControlViews

ControlRouter = DefaultRouter()
ControlRouter.register(prefix='control', viewset=ControlViews, basename='control')