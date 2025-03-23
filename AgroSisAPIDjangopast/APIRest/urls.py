"""
URL configuration for APIRest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#Recuperacion de contraseña
#from apps.Users.views import PasswordResetRequestView, PasswordResetConfirmView

#Importaciones JWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

#Importaciones Swagger (drf-ysg)
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#Config Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

#Importacion de los routers
#FINANZAS
from apps.Finanzas.routers.PagoRouter import PagoRouter
from apps.Finanzas.routers.ProduccionRouter import ProduccionRouter
from apps.Finanzas.routers.ResiduoRouter import ResiduoRouter
from apps.Finanzas.routers.VentaRouter import VentaRouter
#INVENTARIO
from apps.Inventario.routers.HerramientaRouter import HerramientaRouter
from apps.Inventario.routers.InsumoRouter import InsumoRouter
from apps.Inventario.routers.InventarioRouter import InventarioRouter
from apps.Inventario.routers.Tipo_HerramientaRouter import Tipo_HerramientaRouter
from apps.Inventario.routers.Tipo_InsumoRouter import Tipo_InsumoRouter
#IOT
from apps.IoT.routers.ConfiguracionRouter import ConfiguracionRouter
from apps.IoT.routers.SensorRouter import SensorRouter
from apps.IoT.routers.Tipo_SensorRouter import Tipo_SensorRouter
from apps.IoT.routers.DatosMeteRouter import RouterDatos
#TRAZABILIDAD
from apps.Trazabilidad.routers.ActividadRouter import ActividadRouter
from apps.Trazabilidad.routers.AfeccionRouter import AfeccionRouter
from apps.Trazabilidad.routers.Asignacion_ActividadRouter import Asignacion_ActividadRouter
from apps.Trazabilidad.routers.BancalRouter import BancalRouter
from apps.Trazabilidad.routers.ControlRouter import ControlRouter
from apps.Trazabilidad.routers.CultivoRouter import CultivoRouter
from apps.Trazabilidad.routers.EspecieRouter import EspecieRouter
from apps.Trazabilidad.routers.LoteRouter import LoteRouter
from apps.Trazabilidad.routers.NotificacionRouter import NotificacionRouter
from apps.Trazabilidad.routers.PlagaRouter import PlagaRouter
from apps.Trazabilidad.routers.SemilleroRouter import SemilleroRouter
from apps.Trazabilidad.routers.Tipo_EspecieRouter import Tipo_EspecieRouter
from apps.Trazabilidad.routers.Tipo_PlagaRouter import Tipo_PlagaRouter
#Usuario
from apps.Users.routers.UsuarioRouter import UsuarioRouter

urlpatterns = [
    #Recuperacion de contraseña
    #path("reset-password/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    #path("reset-password/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),

    path('admin/', admin.site.urls),
    #URLs de JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # URLs de usuario
    path('api/', include(UsuarioRouter.urls)),
    #URLs de Swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    #Routers de las aplicaciones
    
    # Finanzas
    path('api/', include(PagoRouter.urls)),
    path('api/', include(ProduccionRouter.urls)),
    path('api/', include(ResiduoRouter.urls)),
    path('api/', include(VentaRouter.urls)),

    # Inventario
    path('api/', include(HerramientaRouter.urls)),
    path('api/', include(InsumoRouter.urls)),
    path('api/', include(InventarioRouter.urls)),
    path('api/', include(Tipo_HerramientaRouter.urls)),
    path('api/', include(Tipo_InsumoRouter.urls)),

    # IoT
    path('api/', include(ConfiguracionRouter.urls)),
    path('api/', include(SensorRouter.urls)),
    path('api/', include(Tipo_SensorRouter.urls)),
    path('api/', include(RouterDatos.urls)),


    # Trazabilidad
    path('api/', include(ActividadRouter.urls)),
    path('api/', include(AfeccionRouter.urls)),
    path('api/', include(Asignacion_ActividadRouter.urls)),
    path('api/', include(BancalRouter.urls)),
    path('api/', include(ControlRouter.urls)),
    path('api/', include(CultivoRouter.urls)),
    path('api/', include(EspecieRouter.urls)),
    path('api/', include(LoteRouter.urls)),
    path('api/', include(NotificacionRouter.urls)),
    path('api/', include(PlagaRouter.urls)),
    path('api/', include(SemilleroRouter.urls)),
    path('api/', include(Tipo_EspecieRouter.urls)),
    path('api/', include(Tipo_PlagaRouter.urls)),

]
