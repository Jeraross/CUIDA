from django.shortcuts import render, redirect, get_object_or_404
from .models import Paciente
from .forms import PacienteForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages

def form(request):

    if request.method == 'GET':
        pacientes = Paciente.objects.all()
        form = PacienteForm()

        context = {
            'pacientes' : pacientes,
            'form': form,
        }

        return render(request, 'cadastro/form.html', context)
    elif request.method == 'POST':
        form = PacienteForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('listagem_pacientes')
        else:
            pacientes = Paciente.objects.all()

            context = {
                'pacientes' : pacientes,
                'form': form,
            }
            return render(request, 'cadastro/form.html', context)


def update(request, id_paciente):
    if request.method == 'GET':
        paciente = Paciente.objects.filter(id_paciente=id_paciente).first()
        form = PacienteForm(instance=paciente)
        context = {
            'form': form,
        }

        return render(request, 'cadastro/form.html', context)
    elif request.method == 'POST':
        paciente = Paciente.objects.filter(id_paciente=id_paciente).first()
        form = PacienteForm(request.POST, instance = paciente)
        if form.is_valid():
            form.save()
            return redirect('listagem_pacientes')
        else:
            pacientes = Paciente.objects.all()

            context = {
                'pacientes' : pacientes,
            }
            return render(request, 'cadastro/pacientes.html', context)



def pacientes(request):
    if request.method == 'POST':
        form = PacienteForm(request.POST)
        
        if form.is_valid():
            # Salvar o novo paciente
            form.save()
            return redirect('listagem_pacientes')
        else:
            # Se o formulário não for válido, renderizar a página com erros
            context = {
                'form': form,
                'pacientes': Paciente.objects.all(),
            }
            return render(request, 'cadastro/pacientes.html', context)
    
    # Se o método for GET, exibir a listagem de pacientes
    context = {
        'form': PacienteForm(),
        'pacientes': Paciente.objects.all(),
    }
    return render(request, 'cadastro/pacientes.html', context)

def delete_paciente(request, id_paciente):
    paciente = get_object_or_404(Paciente, id_paciente=id_paciente)
    paciente.delete()
    return redirect('listagem_pacientes')

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


def home(request):
    return render(request, 'cadastro/home.html')
