from django.db import models

class Paciente(models.Model):
    id_paciente = models.AutoField(primary_key=True)
    nome = models.TextField(max_length=255)
    idade = models.IntegerField()