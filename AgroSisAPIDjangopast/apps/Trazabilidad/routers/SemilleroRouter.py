from rest_framework.routers import DefaultRouter
from ..views.SemilleroViews import SemilleroViews

SemilleroRouter = DefaultRouter()
SemilleroRouter.register(prefix='semillero', viewset=SemilleroViews, basename='semillero')