from rest_framework import serializers
from ..models.Herramienta import Herramienta
from ..models.Tipo_Herramienta import Tipo_Herramienta  # ✅ Agregado

class HerramientaSerializer(serializers.ModelSerializer):
    fk_tipo_herramienta = serializers.PrimaryKeyRelatedField(queryset=Tipo_Herramienta.objects.all())

    class Meta:
        model = Herramienta
        fields = '__all__'

    def validate_unidades(self, value):
        if value < 0:
            raise serializers.ValidationError("Las unidades no pueden ser negativas.")
        return value

    def validate_precioCU(self, value):
        if value < 0:
            raise serializers.ValidationError("El precio no puede ser negativo.")
        return value
