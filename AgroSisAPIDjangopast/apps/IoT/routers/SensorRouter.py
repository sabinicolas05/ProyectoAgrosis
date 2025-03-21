from rest_framework.routers import DefaultRouter
from ..views.SensorViews import SensorViews

SensorRouter = DefaultRouter()
SensorRouter.register(prefix='sensor',viewset=SensorViews,basename='sensor')