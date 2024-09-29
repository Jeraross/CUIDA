from django.shortcuts import render, redirect, get_object_or_404
from .models import Paciente
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages

def add(request):
    if request.method == 'POST':

        nome = request.POST.get('nome')
        idade = request.POST.get('idade')
        numero_celular = request.POST.get('numero_celular')
        numero_prontuario = request.POST.get('numero_prontuario')
        tipo_cirurgia = request.POST.get('tipo_cirurgia')
        status = request.POST.get('status')

        paciente = Paciente(
            nome=nome,
            idade=idade,
            numero_celular=numero_celular,
            numero_prontuario=numero_prontuario,
            tipo_cirurgia=tipo_cirurgia,
            status=status
        )
        paciente.save()

        return redirect('home')

    return render(request, 'cadastro/form.html')

def update(request, id_paciente):
    paciente = Paciente.objects.filter(id_paciente=id_paciente).first()
    
    if request.method == 'POST':
        # Capturar os dados do formulário
        paciente.nome = request.POST.get('nome')
        paciente.idade = request.POST.get('idade')
        paciente.numero_celular = request.POST.get('numero_celular')
        paciente.numero_prontuario = request.POST.get('numero_prontuario')
        paciente.tipo_cirurgia = request.POST.get('tipo_cirurgia')
        paciente.status = request.POST.get('status')

        paciente.save()
        return redirect('listagem_pacientes')

    context = {
        'paciente': paciente
    }
    return render(request, 'cadastro/form.html', context)


def visualizar(request):
    pacientes = Paciente.objects.all()
    context = {
        'pacientes': pacientes
    }
    return render(request, 'cadastro/pacientes.html', context)

def delete_paciente(request, id_paciente):
    paciente = get_object_or_404(Paciente, id_paciente=id_paciente)
    paciente.delete()
    return redirect('listagem_pacientes')

def register(request):

    return render(request, 'cadastro/login.html')  # Altere conforme o nome do seu template

def home(request):
    return render(request, 'cadastro/home.html')
