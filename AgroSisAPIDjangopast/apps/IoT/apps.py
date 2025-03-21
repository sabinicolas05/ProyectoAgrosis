from django.apps import AppConfig
from django.db.models.signals import post_save

class IotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.IoT'

    def ready(self):
        from apps.IoT.models import Sensor
        from apps.IoT.socket.signals import send_ws_message_on_create, send_ws_message_on_update  # Importar las señales

        # Conectar las señales para POST y PUT
        post_save.connect(send_ws_message_on_create, sender=Sensor)
        post_save.connect(send_ws_message_on_update, sender=Sensor)

        print("✅ Señales post_save conectadas correctamente")
