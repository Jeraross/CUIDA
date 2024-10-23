import sys
import os
import django

# Configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')
django.setup()

from app_cuida.models import Paciente

# Exclui todos os pacientes
Paciente.objects.all().delete()
print("Todos os pacientes foram excluídos.")
