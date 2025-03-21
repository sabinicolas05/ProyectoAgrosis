from rest_framework.routers import DefaultRouter
from ..views.UsuarioViews import UsuarioViews

UsuarioRouter= DefaultRouter()
UsuarioRouter.register(prefix='usuario', viewset=UsuarioViews, basename="usuario")
