import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')
django.setup()

from app_cuida.models import Paciente

def delete_all_patients():
    try:
        # Exclui todos os pacientes
        Paciente.objects.all().delete()
        print("Todos os pacientes foram excluídos com sucesso.")
    except Exception as e:
        print(f"Ocorreu um erro ao excluir pacientes: {e}")

if __name__ == "__main__":
    delete_all_patients()
