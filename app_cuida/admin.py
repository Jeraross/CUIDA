from django.contrib import admin
from .models import Paciente, Especialidade

admin.site.register(Paciente)
admin.site.register(Especialidade)