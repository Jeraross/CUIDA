from datetime import date
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
    
class Especialidade(models.Model):
    nome = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Medico(models.Model):
    nome = models.CharField(max_length=255)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)
    crm = models.CharField(max_length=15, null=True, blank=True)
    numero_celular = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.nome
    
class Consulta(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    data_consulta = models.DateField()
    horario = models.TimeField(max_length=5)

    def __str__(self):
        return f"Consulta de {self.paciente.nome} com {self.medico.nome} em {self.data_consulta} às {self.horario}"


# Create your models here.
class Events(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255,null=True,blank=True)
    start = models.DateTimeField(null=True,blank=True)
    end = models.DateTimeField(null=True,blank=True)

    class Meta:  
        db_table = "tblevents"

# models.py
# models.py
class Biometria(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='biometrias')
    data_consulta = models.DateField()
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    altura = models.IntegerField()
    imc = models.DecimalField(max_digits=4, decimal_places=1, blank=True)

    def save(self, *args, **kwargs):
        # Converte peso para float e altura para inteiro para evitar erros de tipo
        if self.peso and self.altura:
            try:
                peso_num = float(self.peso)  # Certifique-se de que peso é numérico
                altura_num = int(self.altura)  # Certifique-se de que altura é inteiro
                altura_m = altura_num / 100  # Converte altura de cm para metros
                self.imc = round(peso_num / (altura_m ** 2), 1)
            except ValueError:
                pass  # Se houver erro na conversão, não calculamos o IMC
        super().save(*args, **kwargs)

class SinaisVitais(models.Model):
    # Campos existentes
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='sinais_vitais')
    data_consulta = models.DateField()
    temperatura = models.DecimalField(max_digits=4, decimal_places=1)
    pulso = models.IntegerField()
    pressao = models.CharField(max_length=10, default="120/80")

    def __str__(self):
        return f"Sinais vitais de {self.paciente.nome} em {self.data_consulta}"