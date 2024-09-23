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
