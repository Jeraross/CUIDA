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
    path('paciente/<int:id_paciente>/adicionar_biometria/', views.adicionar_biometria, name='adicionar_biometria'),
    path('excluir_biometria/<int:id_biometria>/<int:id_paciente>/', views.excluir_biometria, name='excluir_biometria'),
    path('paciente/<int:id_paciente>/adicionar_sinais_vitais/', views.adicionar_sinais_vitais, name='adicionar_sinais_vitais'),
    path('excluir_sinais_vitais/<int:id_sinais_vitais>/<int:id_paciente>/', views.excluir_sinais_vitais, name='excluir_sinais_vitais'),
    path('paciente/<int:paciente_id>/adicionar_condicao_especial/', views.adicionar_condicao_especial, name='adicionar_condicao_especial'),
    path('excluir_condicao_especial/<int:id_condicao>/<int:id_paciente>/', views.excluir_condicao_especial, name='excluir_condicao_especial'),
    path('paciente/<int:paciente_id>/adicionar_alergia/', views.adicionar_alergia, name='adicionar_alergia'),
    path('excluir_alergia/<int:id_alergia>/<int:id_paciente>/', views.excluir_alergia, name='excluir_alergia'),
    path('paciente/<int:paciente_id>/adicionar_medicamento_ativo/', views.adicionar_medicamento_ativo, name='adicionar_medicamento_ativo'),
    path('excluir_medicamento_ativo/<int:id_medicamento>/<int:id_paciente>/', views.excluir_medicamento_ativo, name='excluir_medicamento_ativo'),
]
