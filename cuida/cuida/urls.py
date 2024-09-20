from django.urls import path
from app_cuida import views
from django.contrib import admin

urlpatterns = [
    path('', views.home,name='home'),
    path('admin/', admin.site.urls),
    path('pacientes/', views.pacientes, name='listagem_pacientes')
]
