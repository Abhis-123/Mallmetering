from django.urls import path
from .views import Login
from django.conf.urls import url
from . import views

urlpatterns = [
    

    path('logincustomer/',Login , name='login_customer'),
    url(r'^operations/',views.customers,name="customers"),
    url(r'^getreadings/(?P<username>[\w.@+-]+)/$',views.getreadings,name="getreadings"),
    url(r'^usage/(?P<username>[\w.@+-]+)/$',views.usage,name="usage"),

]