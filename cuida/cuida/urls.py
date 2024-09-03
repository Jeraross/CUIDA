from django.urls import path
from app_cuida import views

urlpatterns = [
    path('', views.home,name='home'),
]
