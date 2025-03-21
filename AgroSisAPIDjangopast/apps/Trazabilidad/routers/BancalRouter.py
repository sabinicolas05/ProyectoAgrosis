from rest_framework.routers import DefaultRouter
from ..views.BancalViews import BancalViews

BancalRouter = DefaultRouter()
BancalRouter.register(prefix='bancal', viewset=BancalViews, basename='bancal')