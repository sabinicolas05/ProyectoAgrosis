import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack  # Esto permite autenticar usuarios en WebSockets
from django.apps import apps 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "APIRest.settings")

django.setup()

from apps.IoT.socket.routing import websocket_urlpatterns  # Mueve esta línea aquí

if not apps.ready:
    raise RuntimeError("Las aplicaciones de Django no están listas aún")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),
    }
)
