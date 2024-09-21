# Generated by Django 5.1.1 on 2024-09-20 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_cuida', '0002_paciente_numero_celular'),
    ]

    operations = [
        migrations.AddField(
            model_name='paciente',
            name='numero_prontuario',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='status',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='tipo_cirurgia',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
    ]