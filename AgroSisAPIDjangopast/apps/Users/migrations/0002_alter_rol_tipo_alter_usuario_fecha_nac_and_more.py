# Generated by Django 5.1.3 on 2025-03-13 04:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rol',
            name='tipo',
            field=models.CharField(max_length=40, unique=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='fecha_nac',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='fk_rol',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Users.rol'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='telefono',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
