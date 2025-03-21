from rest_framework.serializers import ModelSerializer
from ..models import Usuario

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}  # Evita que la contraseña se muestre en respuestas

    def create(self, validated_data):
        user = Usuario(**validated_data)
        user.set_password(validated_data['password'])  # Encripta la contraseña
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])  # Encripta si se actualiza la contraseña
            validated_data.pop('password')
        return super().update(instance, validated_data)
