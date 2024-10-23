import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')
django.setup()

from app_cuida.models import Especialidade

def delete_all_specialties():
    Especialidade.objects.all().delete()
    print("Todas as especialidades foram excluídas.")

if __name__ == "__main__":
    delete_all_specialties()
