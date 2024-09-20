from django.shortcuts import render

def home(request):
    return render(request, 'cadastro/home.html')

def pacientes(request):
    pass