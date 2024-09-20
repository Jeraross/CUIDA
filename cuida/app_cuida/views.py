from django.shortcuts import render
from .models import Paciente

def home(request):
    return render(request, 'cadastro/home.html')

def pacientes(request):
    #Salvar os dados da tela para o banco de dados
    novo_paciente = Paciente()
    novo_paciente.nome = request.POST.get('nome')
    novo_paciente.idade = request.POST.get('idade')
    novo_paciente.save()
    #Exibir todos os usuários já cadastrados em uma nova página:
    pacientes = {
        'pacientes': Paciente.objects.all()
    }
    #Retornar os dados para a página de listagem de pacientes:
    return render(request, 'cadastro/pacientes.html', pacientes)