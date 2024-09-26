from django.db import models

class Paciente(models.Model):
    ATENDIDO = 'ATENDIDO'
    NAO_ATENDIDO = 'NAO ATENDIDO'

    STATUS_CHOICES = [
        (ATENDIDO, 'Atendido'),
        (NAO_ATENDIDO, 'Não Atendido'),
    ]

    id_paciente = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=25, null=True, blank=True)
    idade = models.IntegerField(null=True, blank=True)
    numero_celular = models.CharField(max_length=15, null=True, blank=True)
    numero_prontuario = models.CharField(max_length=15, null=True, blank=True)
    tipo_cirurgia = models.CharField(max_length=15, null=True, blank=True)
    status = models.CharField(
        max_length=12,
        choices=STATUS_CHOICES,
        default=NAO_ATENDIDO
    )

    def __str__(self):
        return self.nome
