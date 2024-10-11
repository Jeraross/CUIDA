from django.urls import path
from app_cuida import views
from django.contrib import admin

urlpatterns = [
    path('', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),     
    path('form/', views.add, name='form'), 
    path('admin/', admin.site.urls),
    path('pacientes/', views.visualizar, name='listagem_pacientes'),
    path('edit/', views.visualizar_edit, name='edit'),
    path('update/<int:id_paciente>/', views.update, name='update_paciente'),
    path('delete/<int:id_paciente>/', views.delete_paciente, name='delete_paciente'),
    path('cadastrar_especialidade/', views.cadastrar_especialidade, name='cadastrar_especialidade'),
    path('visualizar_especialidades/', views.visualizar_especialidades, name='visualizar_especialidades'),
]
