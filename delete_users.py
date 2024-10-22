import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cuida.settings')  
django.setup()

from django.contrib.auth.models import User


User.objects.all().delete()
print("Todos os usuários foram deletados.")