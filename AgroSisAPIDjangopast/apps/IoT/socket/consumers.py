import json
import django
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

django.setup()

from apps.IoT.models.DatosMeteorologicos import DatosMeteorologicos

class DatosMeteorologicosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("datos_meteorologicos", self.channel_name)
        await self.accept()
        print("✅ WebSocket Conectado!")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("datos_meteorologicos", self.channel_name)
        print("❌ WebSocket Desconectado!")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            print("📩 Datos Recibidos:", data)

            # Validar que los datos sean correctos
            if "valor_medicion" in data and "fk_id_sensor" in data and "fk_id_bancal" in data:
                nuevo_dato = await sync_to_async(DatosMeteorologicos.objects.create)(
                    fk_id_sensor_id=data["fk_id_sensor"],
                    fk_id_bancal_id=data["fk_id_bancal"],
                    valor_medicion=data["valor_medicion"]
                )

                # Enviar datos a los clientes conectados
                await self.channel_layer.group_send(
                    "datos_meteorologicos",
                    {
                        "type": "enviar_dato",
                        "message": {
                            "id": nuevo_dato.id,
                            "valor_medicion": data["valor_medicion"],
                            "fk_id_sensor": data["fk_id_sensor"],
                            "fk_id_bancal": data["fk_id_bancal"],
                            "fecha_medicion": nuevo_dato.fecha_medicion.strftime("%Y-%m-%d %H:%M:%S")
                        }
                    }
                )
                print("✅ Datos meteorológicos guardados en la base de datos!")

            elif "comando" in data:
                # Si recibimos un comando, lo retransmitimos al ESP32
                await self.channel_layer.group_send(
                    "datos_meteorologicos",
                    {
                        "type": "enviar_comando",
                        "message": data
                    }
                )
                print("🔄 Comando enviado al ESP32:", data)

        except Exception as e:
            print("❌ Error al procesar el mensaje:", str(e))

    async def enviar_dato(self, event):
        await self.send(text_data=json.dumps(event["message"]))

    async def enviar_comando(self, event):
        await self.send(text_data=json.dumps(event["message"]))
