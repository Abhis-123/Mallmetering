from django.urls import path
from . import views
from django.conf.urls import url


urlpatterns = [
    

    path('loginsupervisor/', views.Login, name='login_supervisor'),
    #path('addconnection/', RegisterMeterAPI.as_view(), name='add_connection'),
    #path('editconnection/', views.update_meterconnection, name='edit_connection'),
        
    url(r'^listsupervisor/(?P<username>[\w.@+-]+)/$',views.one_supervisor,name="one_supervisor"),
    url(r'^update_supervisor/(?P<username>[\w.@+-]+)/$', views.update_supervisor, name='update_supervisor'),
    url(r'^update_connection/(?P<username>[\w.@+-]+)/$', views.update_connection, name='connection'),
    path('listconnections/',views.all_connections,name='connections')

]