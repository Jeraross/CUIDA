from django.urls import path
from app_cuida import views
from django.contrib import admin
    

urlpatterns = [
    path('', views.cadastro, name='cadastro'),
    path('', views.index, name='index'),
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
    path('cadastrar_medico/', views.cadastrar_medico, name='cadastrar_medico'),
    path('visualizar_medicos/', views.visualizar_medicos, name='visualizar_medicos'),
    path('cadastrar_consulta/', views.cadastrar_consulta, name='cadastrar_consulta'),
    path('visualizar_consultas/', views.visualizar_consultas, name='visualizar_consultas'),
    path('paciente/<int:id_paciente>/', views.detalhes_paciente, name='detalhes_paciente'),
    path('all_consultas/', views.all_events, name='all_consultas'),  # Alterado para 'consultas'
    path('add_consulta/', views.add_event, name='add_consulta'),     # Alterado para 'consulta'
    path('update_consulta/', views.update, name='update_consulta'),  # Alterado para 'consulta'
    path('remove_consulta/', views.remove, name='remove_consulta'),  # Alterado para 'consulta'
]
