from rest_framework.routers import DefaultRouter
from ..views.NotificacionViews import NotificacionViews

NotificacionRouter = DefaultRouter()
NotificacionRouter.register(prefix='notificacion', viewset=NotificacionViews, basename='notificacion')