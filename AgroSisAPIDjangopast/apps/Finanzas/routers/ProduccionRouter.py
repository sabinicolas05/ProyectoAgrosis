from rest_framework.routers import DefaultRouter
from ..views.ProduccionViews import ProduccionViews
ProduccionRouter = DefaultRouter()

ProduccionRouter.register(prefix='produccion',viewset=ProduccionViews,basename='produccion')