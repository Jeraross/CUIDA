import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')
django.setup()

from app_cuida.models import Medico

def delete_all_doctors():
    Medico.objects.all().delete()
    print("Todos os médicos foram excluídos.")

if __name__ == "__main__":
    delete_all_doctors()
