from django.shortcuts import render, redirect
from .models import Paciente
from .forms import PacienteForm

def home(request):

    if request.method == 'GET':
        pacientes = Paciente.objects.all()
        form = PacienteForm()

        context = {
            'pacientes' : pacientes,
            'form': form,
        }

        return render(request, 'cadastro/home.html', context)
    elif request.method == 'POST':
        form = PacienteForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('pacientes/')
        else:
            pacientes = Paciente.objects.all()

            context = {
                'pacientes' : pacientes,
                'form': form,
            }
            return render(request, 'cadastro/home.html', context)


def update(request, id_paciente):
    if request.method == 'GET':
        paciente = Paciente.objects.filter(id_paciente=id_paciente).first()
        form = PacienteForm(instance=paciente)
        context = {
            'form': form,
        }

        return render(request, 'cadastro/home.html', context)
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
    #Salvar os dados da tela para o banco de dados
    novo_paciente = Paciente()
    novo_paciente.nome = request.POST.get('nome')
    novo_paciente.idade = request.POST.get('idade')
    novo_paciente.numero_celular = request.POST.get('numero_celular')
    novo_paciente.numero_prontuario = request.POST.get('numero_prontuario')
    novo_paciente.tipo_cirurgia = request.POST.get('tipo_cirurgia')
    novo_paciente.status = request.POST.get('status')
    novo_paciente.save()
    #Exibir todos os usuários já cadastrados em uma nova página:
    pacientes = {
        'pacientes': Paciente.objects.all()
    }
    #Retornar os dados para a página de listagem de pacientes:
    return render(request, 'cadastro/pacientes.html', pacientes)