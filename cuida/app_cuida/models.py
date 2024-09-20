from django.db import models

class Paciente(models.Model):
    id_paciente = models.AutoField(primary_key=True)
    nome = models.TextField(max_length=255)
    idade = models.IntegerField()
    numero_celular = models.CharField(max_length=15, null=True, blank=True)
    numero_prontuario = models.CharField(max_length=15, null=True, blank=True)
    tipo_cirurgia = models.TextField(max_length=255, null=True, blank=True)
    status = models.TextField(max_length=255, null=True, blank=True)