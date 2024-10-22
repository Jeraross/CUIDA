import os
import django
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings') 
django.setup()

from app_cuida.models import Paciente

def delete_patient(cpf):
    try:
        paciente = Paciente.objects.filter(cpf=cpf).first()
        if paciente:
            paciente.delete()
            print(f"Paciente com CPF {cpf} foi excluído com sucesso.")
        else:
            print(f"Nenhum paciente encontrado com CPF {cpf}.")
    except Exception as e:
        print(f"Ocorreu um erro ao excluir o paciente: {e}")

if __name__ == "__main__":
    cpf_to_delete = '12345678909'
    delete_patient(cpf_to_delete)
