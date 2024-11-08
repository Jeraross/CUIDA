from django.urls import path
from app_cuida import views
from django.contrib import admin
    

urlpatterns = [
    path('', views.cadastro, name='cadastro'),
    path('calendario/', views.index, name='index'),
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
    path('excluir_especialidade/<int:id>/', views.excluir_especialidade, name='excluir_especialidade'),
    path('cadastrar_medico/', views.cadastrar_medico, name='cadastrar_medico'),
    path('visualizar_medicos/', views.visualizar_medicos, name='visualizar_medicos'),
    path('excluir_medico/<int:id>/', views.excluir_medico, name='excluir_medico'),
    path('cadastrar_consulta/', views.cadastrar_consulta, name='cadastrar_consulta'),
    path('visualizar_consultas/', views.visualizar_consultas, name='visualizar_consultas'),
    path('excluir_consulta/<int:id>', views.excluir_consulta, name='excluir_consulta'),
    path('paciente/<int:id_paciente>/', views.detalhes_paciente, name='detalhes_paciente'),
    path('all_consultas/', views.all_consultas, name='all_consultas'),
    path('gerar-relatorio/', views.gerar_relatorio, name='gerar_relatorio'),
    path('paciente/<int:id_paciente>/adicionar_consulta/', views.adicionar_historico, name='adicionar_historico')
]
