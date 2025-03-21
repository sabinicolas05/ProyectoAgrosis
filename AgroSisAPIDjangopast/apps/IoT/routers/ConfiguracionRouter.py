from rest_framework.routers import DefaultRouter
from ..views.ConfiguracionViews import ConfiguracionViews

ConfiguracionRouter = DefaultRouter()
ConfiguracionRouter.register(prefix='configuracion',viewset=ConfiguracionViews,basename='configuracion')