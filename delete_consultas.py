import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')
django.setup()

from app_cuida.models import Consulta

def delete_all_appointments():
    Consulta.objects.all().delete()
    print("Todas as consultas foram excluídas.")

if __name__ == "__main__":
    delete_all_appointments()
