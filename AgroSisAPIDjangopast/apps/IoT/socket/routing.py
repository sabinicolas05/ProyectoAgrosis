from django.urls import re_path
from .consumers import DatosMeteorologicosConsumer

websocket_urlpatterns = [
    re_path(r"ws/datos/$", DatosMeteorologicosConsumer.as_asgi()),  

]
