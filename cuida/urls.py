from django.urls import path
from app_cuida import views
from django.contrib import admin
from app_cuida.views import calendario_view
    

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
    path('especialidade/excluir/<int:id>/', views.excluir_especialidade, name='excluir_especialidade'),
    path('cadastrar_medico/', views.cadastrar_medico, name='cadastrar_medico'),
    path('visualizar_medicos/', views.visualizar_medicos, name='visualizar_medicos'),
    path('medicos/excluir/<int:id>/', views.excluir_medico, name='excluir_medico'),
    path('cadastrar_consulta/', views.cadastrar_consulta, name='cadastrar_consulta'),
    path('visualizar_consultas/', views.visualizar_consultas, name='visualizar_consultas'),
    path('consulta/excluir/<int:id>/', views.excluir_consulta, name='excluir_consulta'),
    path('calendario/', calendario_view, name='calendario'),
    path('paciente/<int:id_paciente>/', views.detalhes_paciente, name='detalhes_paciente'),
    
]
