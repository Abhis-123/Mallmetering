from .views import RegisterAPI
from . import views
from django.urls import path
from django.conf.urls import url

urlpatterns = [
    path('api/auth/', views.auth, name='auth'),
    path('api/register/', RegisterAPI.as_view(), name='auth'),
    path('api/login/',views.AdminLogin, name='login'),
    
    url(r'^dashboard/',views.dashboard, name='dashboard'),
    url(r'^config/',views.config, name='config'),
    url(r'^profile/',views.profile, name='profile'),
    url(r'^supervisors/',views.supervisors, name="supervisors"),
    url(r'^customers/',views.customers,name="customers"),
    url(r'^meters/',views.meters,name="meters"),
]
