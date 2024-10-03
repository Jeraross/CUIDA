from django.shortcuts import render, redirect, get_object_or_404
from .models import Paciente
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse

@login_required(login_url='login')
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

@login_required(login_url='login')
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
        return render('cadastro/editar.html')

    context = {
        'paciente': paciente
    }
    return render(request, 'cadastro/form.html', context)

@login_required(login_url='login')
def visualizar(request):
    pacientes = Paciente.objects.all()
    context = {
        'pacientes': pacientes
    }
    return render(request, 'cadastro/pacientes.html', context)

@login_required(login_url='login')
def visualizar_edit(request):
    pacientes = Paciente.objects.all()
    context = {
        'pacientes': pacientes
    }
    return render(request, 'cadastro/editar.html', context)

@login_required(login_url='login')
def delete_paciente(request, id_paciente):
    paciente = get_object_or_404(Paciente, id_paciente=id_paciente)
    paciente.delete()
    return redirect('edit')

def cadastro(request):
    if request.method == 'GET':
        return render(request, 'cadastro/login.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        # Verifica se o usuário já existe
        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse('Já existe um usuário com esse nome!')
        
        # Se não existir, cria um novo usuário
        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()

        return render(request, 'cadastro/login.html', {'success_message': 'Usuário cadastrado com sucesso!'})

def login(request):
    if request.method == 'GET':
        return render(request, 'cadastro/login.html')
    else:
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        # Autentica o usuário
        user = authenticate(request, username=username, password=senha)

        if user is not None:
            auth_login(request, user)  # Alterado o nome para auth_login para não sobrecarregar o método login
            return redirect('home')
        else:
            return HttpResponse('Usuário ou senha inválidos!')

@login_required(login_url='login')
def home(request):
    return render(request, 'cadastro/home.html')
