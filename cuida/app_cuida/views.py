from django.shortcuts import render, redirect, get_object_or_404
from .models import Paciente
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages

from django.shortcuts import render, redirect
from .models import Paciente

def form(request):
    if request.method == 'POST':
        # Capturar os dados do formulário
        nome = request.POST.get('nome')
        idade = request.POST.get('idade')
        numero_celular = request.POST.get('numero_celular')
        numero_prontuario = request.POST.get('numero_prontuario')
        tipo_cirurgia = request.POST.get('tipo_cirurgia')
        status = request.POST.get('status')

        # Criar um novo objeto Paciente
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
        return redirect('home')

    context = {
        'paciente': paciente
    }
    return render(request, 'cadastro/form.html', context)


def pacientes(request):
    # Se o método for GET, exibir a listagem de pacientes
    pacientes = Paciente.objects.all()

    context = {
        'pacientes': pacientes
    }

    return render(request, 'cadastro/pacientes.html', context)

def delete_paciente(request, id_paciente):
    paciente = get_object_or_404(Paciente, id_paciente=id_paciente)
    paciente.delete()
    return redirect('editar_pacientes')

def register(request):
    if request.method == 'POST':
        username = request.POST['nome']
        email = request.POST['email']
        password = request.POST['senha']
        perfil = request.POST['perfil']

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        

        messages.success(request, 'Conta criada com sucesso! Faça login.')
        return redirect('login')

    return render(request, 'cadastro/login.html')  # Altere conforme o nome do seu template

def login_view(request):
    if request.method == 'POST':
        username = request.POST['nome']
        password = request.POST['senha']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')  # Redirecione para a página inicial ou onde desejar
        else:
            messages.error(request, 'Nome de usuário ou senha inválidos.')

    return render(request, 'cadastro/login.html')  # Altere conforme o nome do seu template


def edit(request):
    pacientes = Paciente.objects.all()

    context = {
            'pacientes' : pacientes,
        }

    return render(request, 'cadastro/editar.html', context)

def home(request):
    return render(request, 'cadastro/home.html')
