from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Manager personalizado para la creación de usuarios
class UsuarioFormulario(BaseUserManager):
    def create_user(self, identificacion, email, username, password=None, **extra_fields):
        if not identificacion:
            raise ValueError("Identificación no ingresada")
        if not email:
            raise ValueError("Correo no ingresado")
        if not username:
            raise ValueError("Usuario no ingresado")
        if not password:
            raise ValueError("Contraseña no ingresada")

        email = self.normalize_email(email)
        user = self.model(
            email=email, identificacion=identificacion, username=username, **extra_fields
        )
        user.set_password(password)  # 🔹 Encripta la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, identificacion, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("El superusuario debe tener is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("El superusuario debe tener is_superuser=True")

        return self.create_user(identificacion, email, username, password, **extra_fields)


# Modelo de Rol
class Rol(models.Model):
    tipo = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.tipo


# Modelo de Usuario personalizado
class Usuario(AbstractUser):
    identificacion = models.BigIntegerField(unique=True, null=False)
    fk_rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_nac = models.DateField(null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=40, unique=True)

    REQUIRED_FIELDS = ["identificacion", "email"]
    objects = UsuarioFormulario()  # Usa el manager personalizado

    def __str__(self):
        return self.username
