from rest_framework.serializers import ModelSerializer
from apps.IoT.models.DatosMeteorologicos import DatosMeteorologicos
from apps.IoT.serializers.SensorSerializer import SensorSerializer  
from apps.Trazabilidad.serializers.BancalSerializer import BancalSerializer  

class leerDatosMeteorologicosSerializer(ModelSerializer):
    fk_id_sensor = SensorSerializer(many=False, required=False)
    fk_id_bancal = BancalSerializer(many=False, required=False)

    class Meta:
        model = DatosMeteorologicos
        fields = '__all__'

class escribirDatosMeteorologicosSerializer(ModelSerializer):
    class Meta:
        model = DatosMeteorologicos
        fields = '__all__'
