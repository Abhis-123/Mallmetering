from django.shortcuts import render
from rest_framework.response import Response
#from .serializers import RegisterSerializer
from .models import Connections,Authorization
from rest_framework.decorators import api_view
from Superadmin.models import SupervisorModel,Meters,CustomerModel
from .serializers import SupervisorSerializer,ConnectionSerializer
from django.contrib.auth.models import User
from uuid import uuid4
from datetime import datetime

# Create your views here.

@api_view(('GET','POST',))
def Login(request):
    data = request.data
    if 'username' not in data:
        return Response(data={"message":" username is required"},status=400)
    if 'password' not in data:
        return Response(data={"message":" password is required"},status=400)
    username=data['username']
    password=data['password']
    try:
        user= SupervisorModel.objects.get(username=username)
    except SupervisorModel.DoesNotExist:
        return Response(data={'message':'user does not exist'},status=400)
    except Exception as e:
        return Response(data={"message":e})

    if user == None:
        return Response(data={"message":"user does not exist"},status=400)    
    if (password==user.password) == False:
        return Response(data={"message":" password is incorrect"},status=400)
    token = uuid4()
    ct = datetime.now()
    session_start_date=  ct.timestamp()
    session_expirey_date=session_start_date+ 60*60*24*30 
    obj= Authorization.objects.create(username=username,token=token,session_start_date=session_start_date,session_expirey_date=session_expirey_date)      
    obj.save()
    return Response(data={
            "username":username,
            "token":token,
            "expiry":session_expirey_date,
        },status=200)



@api_view(('GET',))
def one_supervisor(request,username):
    pics=SupervisorModel.objects.get(username=username)
    serializer=SupervisorSerializer(pics)
    return Response(serializer.data)

@api_view(('POST',))
def update_supervisor(request,username):
    u=SupervisorModel.objects.get(username=username)
    
    u.username=request.data['username']
    u.password=request.data['password']
    u.email=request.data['email']
    
    u.save(update_fields=['username','email','password'])
   
    return Response({
        "message":"updated Supervisor"
        })


@api_view(('POST',))
def update_connection(request,username):
    
    a=Connections.objects.get(username=username)
    if(request.data['meter_name']=="Not Selected" and request.data['initial_meter']!="Not Selected"):
        c=Meters.objects.get(meter_name=request.data["initial_meter"])
        customer= CustomerModel.objects.get(username=username)
        customer.linked=False
        c.linked=False
        customer.save(update_fields=['linked'])
        c.save(update_fields=['linked'])
    elif(request.data['initial_meter']!="Not Selected" and request.data['meter_name']!="Not Selected"):
        e=Meters.objects.get(meter_name=request.data['initial_meter'])
        e.linked=False
        d=Meters.objects.get(meter_name=request.data['meter_name'])
        customer= CustomerModel.objects.get(username=username)
        customer.linked=True
        d.linked=True
        customer.save(update_fields=['linked'])
        e.save(update_fields=['linked'])
        d.save(update_fields=['linked'])
    elif(request.data['initial_meter']=="Not Selected" and request.data['meter_name']!="Not Selected"):
        f=Meters.objects.get(meter_name=request.data["meter_name"])
        customer= CustomerModel.objects.get(username=username)
        customer.linked=True
        f.linked=True
        customer.save(update_fields=['linked'])
        f.save(update_fields=['linked'])
    

        

        
    
    a.username=username
    a.meter_name=request.data['meter_name']
    a.save(update_fields=['username','meter_name','time_stamp'])

    return Response({
        "message":"updated connection",
        
        })

@api_view(('GET',))
def all_connections(request):
    pics=Connections.objects.all()
    serializer=ConnectionSerializer(pics,many=True)
    return Response(serializer.data)


@api_view(('GET','POST'))
def get_statsdata(request):
    data= {}  
    data['total_customers']= CustomerModel.objects.all().count()
    data['active_customers']=CustomerModel.objects.filter(linked=True).count() 
    data['total_meters']=Meters.objects.filter().count()
    data['linked_meters']= Meters.objects.filter(linked=True).count()
    print(data)
    return Response(data=data, status=200)


def isAuthenticated(request):
    token =request.headers.get('Authorization')
    if Authorization.objects.filter(token=token).count()==0:
        return False
    oauth= Authorization.objects.get(token=token)
    ct = datetime.now()
    present=ct.timestamp()
    session_expirey_date=oauth.session_expirey_date
    if present >session_expirey_date:
        return False
    return True
