import os
import django
import random
import asyncio
import json
import websockets
from django.utils.timezone import now
from asgiref.sync import sync_to_async
import sys

# Agregar el directorio raíz del proyecto Django a sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath("APIRest")))
sys.path.append(BASE_DIR)

# Configurar Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "APIRest.settings")
django.setup()

from apps.IoT.models import Sensor
from apps.IoT.models import Configuracion

@sync_to_async
def obtener_sensores():
    print("Obteniendo sensores...")
    return list(Sensor.objects.select_related("fk_configuracion").all())

@sync_to_async
def guardar_medicion(sensor, valor):
    print(f"Guardando medición para el sensor {sensor.id}: {valor}")
    sensor.medicion = valor
    sensor.save()
    return sensor

async def send_random_data():
    print("Enviando datos a WebSocket...")
    uri = "ws://localhost:8000/ws/sensores/"
    async with websockets.connect(uri) as websocket:
        while True:
            sensores = await obtener_sensores()
            if sensores:
                sensor = random.choice(sensores)
                config = sensor.fk_configuracion
                
                if config:
                    valor_min = float(config.valor_min)
                    valor_max = float(config.valor_max)
                    valor = round(random.uniform(valor_min, valor_max), 2)
                    
                    data = {
                        "sensor_id": sensor.id,
                        "valor": valor,
                    }
                    
                    await websocket.send(json.dumps(data))
                    print(f"📡 Enviando datos: {data}")
                    
                    await guardar_medicion(sensor, valor)
                else:
                    print(f"⚠️ El sensor {sensor.id} no tiene configuración asignada.")
            await asyncio.sleep(10)

def run():
    print("Ejecutando script de actualización de sensores...")
    loop = asyncio.get_event_loop()
    loop.run_until_complete(send_random_data())
