from rest_framework.viewsets import ModelViewSet
#from rest_framework.permissions import IsAuthenticatedOrReadOnly
from apps.IoT.models.DatosMeteorologicos import DatosMeteorologicos
from apps.IoT.serializers.DatosMeteSerializers import leerDatosMeteorologicosSerializer, escribirDatosMeteorologicosSerializer

class DatosMeteorologicosViewSet(ModelViewSet):
    queryset = DatosMeteorologicos.objects.select_related('fk_id_tipo_sensor', 'fk_id_bancal')  
    #permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:  
            return leerDatosMeteorologicosSerializer
        return escribirDatosMeteorologicosSerializer
