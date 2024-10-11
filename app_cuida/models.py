from django.db import models

class Paciente(models.Model):
    ATENDIDO = 'Atendido'
    NAO_ATENDIDO = 'Não atendido'

    STATUS_CHOICES = [
        (ATENDIDO, 'Atendido'),
        (NAO_ATENDIDO, 'Não Atendido'),
    ]

    MASCULINO = 'M'
    FEMININO = 'F'
    NAO_INFORMAR = 'N'

    SEXO_CHOICES = [
        (MASCULINO, 'Masculino'),
        (FEMININO, 'Feminino'),
        (NAO_INFORMAR, 'Prefiro não informar'),
    ]

    id_paciente = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=25, null=True, blank=True)
    idade = models.IntegerField(null=True, blank=True)
    cpf = models.CharField(max_length=11, unique=True, null=True, blank=True)
    numero_celular = models.CharField(max_length=15, null=True, blank=True)
    numero_prontuario = models.CharField(max_length=15, null=True, blank=True)
    sexo = models.CharField(
        max_length=1,
        choices=SEXO_CHOICES,
        null=True,
        blank=True
    )
    status = models.CharField(
        max_length=12,
        choices=STATUS_CHOICES,
        default=NAO_ATENDIDO
    )


    def __str__(self):
        return self.nome
