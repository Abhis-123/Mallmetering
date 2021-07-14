from rest_framework import  status
from uuid import uuid4
import datetime;
import csv
# Create your views here.
from rest_framework.decorators import api_view
from datetime import datetime
from django.utils.encoding import smart_str
from rest_framework import generics
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import CutomerSerializer, MeterReadingsSerializer,RegisterSerializer,RegisterSerializerCustomer,RegisterSerializerSupervisor,MemorySerializer,SupervisorSerializer, MeterSerializer,AllMeterSerializer
from .models import Memory , CustomerModel,SupervisorModel,Meters,Meter_Readings, Authorization,Superadmin
import sys
from Subadmins.models import Connections

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(data={'message':str(e)}, status=400)
        user = serializer.save()
        return Response(data=serializer.validated_data,status=200)




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



################################################################
"""" super admin dashboard"""
@api_view(('GET','POST',))
def AdminLogin(request):
    data = request.data
    if 'username' not in data:
        return Response(data={"message":" username is required"},status=400)
    if 'password' not in data:
        return Response(data={"message":" password is required"},status=400)
    username=data['username']
    password=data['password']
    try:
        user= Superadmin.objects.get(id=1)
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


def auth(request):
    if isAuthenticated(request):
        return Response(data={'message':' logged in!'},status=200)
    else:
        return Response(data={'message':'not logged in'}, status=403)



def get_admin(request):
    pics=Superadmin.objects.get(id=1)
    serializer=RegisterSerializer(pics)
    return Response(serializer.data)


def get_statsdata(request):
    type= request.GET.get('type')
    data= {}
    if type=='total_customers':  
        data['total_customers']= CustomerModel.objects.all().count()
    if type=='active_customers':
        data['active_customers']=CustomerModel.objects.filter(linked=True).count() 
    if type=='total_meters':
        data['total_meters']=Meters.objects.filter().count()
    if type=='linked_meters':
        data['linked_meters']= Meters.objects.filter(linked=True).count()
    if type=='total_consumption':
        meters= Meters.objects.filter(linked=True)
        meters= MeterSerializer(meters,many=True)
        consumption=0
        for meter in meters.data:
            meter_id=meter['id']
            reading= Meter_Readings.objects.filter(meter_id=meter_id).order_by('-time_stamp').first()
            if reading!=None:
                consumption=consumption+reading.reading_value
        data['total_consumption']=consumption
    return Response(data=data, status=200)
def get_cunsumption_summary(request):
    customers = CustomerModel.objects.filter(linked=True)
    customers = CutomerSerializer(customers,many=True)
    data =[]
    for customer in customers.data:
        username = customer['username']
        try:
            connection=Connections.objects.get(username=username)
            meter_name = connection.meter_name
            meter_id = Meters.objects.get(meter_name=meter_name).id
            readings = Meter_Readings.objects.filter(meter_id=meter_id)
            readings = MeterReadingsSerializer(readings,many=True)
        except Exception as e:
            continue
        data.append({
            'name': username,
            'values': readings.data
        })
    return Response(data=data, status=200)

@api_view(('GET','POST','DELETE','PUT'))
def dashboard(request):
    operation = request.GET.get('operation')
    if operation == 'getadmin':
        return get_admin(request)
    if operation == 'isAuthenticated':
        q= isAuthenticated(request)
        if q:
            return Response(data={'message':'logged in'}, status=200)
        else:
            return Response(data={'message':'not logged in'}, status=403)
    if operation == 'statsdata':
        return get_statsdata(request)
    if operation =='get_cunsumption_summary':
        return get_cunsumption_summary(request)

    return Response(data={'message':'invalid operation'}, status=400)
################################################################
"""config section of the superadmin"""
@api_view(('GET',)) 
def list_memory(request):
    dummy=Memory.objects.all()
    serializer=MemorySerializer(dummy,many=True)
    return Response(serializer.data)

def archive_data(request):
    meter_id = request.data['meter_id']
    print(request.data)
    meter_id = request.data['meter_id']
    start_date=datetime.strptime(str(request.data['start_date']),"%Y-%m-%d")
    end_date=datetime.strptime(str(request.data['end_date']),"%Y-%m-%d")
    delete= False
    if request.data['delete']=='true':
        delete=True
    readings = Meter_Readings.objects.filter(meter_id=meter_id,time_stamp__gt=start_date,time_stamp__lt=end_date)
    serializer = MeterReadingsSerializer(readings,many=True)
    res = serializer.data
    if delete:
        readings.delete()
    return Response(data=res, status=200)


    

def memory(request):
    my_model_admin = Superadmin()
    total_size_Admin = sys.getsizeof(my_model_admin) * Superadmin.objects.count()
    my_model_customer = CustomerModel()
    total_size_customer = sys.getsizeof(my_model_customer) * CustomerModel.objects.count()
    my_model_supervisor = SupervisorModel()
    total_size_supervisor = sys.getsizeof(my_model_supervisor) * SupervisorModel.objects.count()   
    meters_model= Meters() 
    meters_size = sys.getsizeof(meters_model) * Meters.objects.count()
    meter_readings= Meter_Readings()
    meter_reading_size = sys.getsizeof(meter_readings) * Meter_Readings.objects.count()

    return Response([{
        "database":"Admin",
        "bytesusage":total_size_Admin},{
        "database":"Customer",
        "bytesusage":total_size_customer},{
        "database":"Supervisor",
        "bytesusage":total_size_supervisor},{
        "database":"Meter",
        "bytesusage":meters_size},{
        "database":"MeterReadings",
        'bytesusage':meter_reading_size
        }])
        


@api_view(('GET','POST','DELETE','PUT'))
def config(request):
    operation = request.GET.get('operation')
    if operation=='archivedata':
        return archive_data(request)
    if operation=="memorydetails":
        return memory(request)
    return Response(data={'message':'invalid opration'})

###########################################################################
"""profile section for super admin"""

def update_admin(request):
    if len(request.data['username'])<1:
        return Response(data={'message':'username cannot be empty'},status=400)
    if len(request.data['email'])<1:
        return Response(data={'message':'email cannot be empty'},status=400)

    if len(request.data['mobile_no'])<1:
        return Response(data={'message':'mobile number cannot be empty'},status=400)

    admin = Superadmin.objects.get(id=1)
    admin.username = request.data['username']
    admin.email = request.data['email']
    admin.mobile_no = request.data['mobile_no']
    admin.save(update_fields=['username','email','mobile_no'])
    return Response(data={
        'username':admin.username,'email':admin.email,'mobile_no':admin.mobile_no
    },status=200)



def changepassword(request):
    data = request.data
    if ('oldpassword' in data)== False:
        return Response(data={'message':'old password not specified'},status=400)
    if ('newpassword' in data)== False:
        return Response(data={'message':'new password not specified'},status=400)
    
    admin= Superadmin.objects.get(id=1)
    if len(data['newpassword'])<8:
        return Response(data={'message':'password cannot be less than 8 characters'},status=400)
    admin.password=data['newpassword']
    admin.save(update_fields=['password'])
    return Response(data={'message':'changed password'},status=200)


def changeprofileimage(request):
    serializer=RegisterSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={'message':str(e)}, status=400)
    admin=Superadmin.objects.get(id=1)
    admin.profile_pic= serializer.validated_data['profile_pic']
    admin.save(update_fields=['profile_pic'])
    return Response(data={'message':'updated profile_pic'})


@api_view(('GET','POST','DELETE','PUT'))
def profile(request):
    operation = request.GET.get('operation')
    if operation == 'get':
        pics=Superadmin.objects.get(id=1)
        serializer=RegisterSerializer(pics)
        return Response(serializer.data)
        
    if operation == 'update':
        return update_admin(request)
    if operation=="changepassword":
        return changepassword(request)
    return Response(data={'message':'incorrect url'},status=400)


######################################
""" section for supervisors"""

def all_supervisors(request):
    pics=SupervisorModel.objects.all()
    serializer=SupervisorSerializer(pics,many=True)
    return Response(serializer.data)

def one_supervisor(request,user_id):
    pics=SupervisorModel.objects.get(id=user_id)
    serializer=SupervisorSerializer(pics)
    return Response(serializer.data)


def delete_supervisor(request, user_id):
    supervisor = SupervisorModel.objects.get(id=user_id)

    if request.method == 'DELETE': 
        supervisor.delete() 
        return Response(data={'message': 'supervisor was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


def register_supervisor(request):
    data = request.data
    serializer= RegisterSerializerSupervisor(data=data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={'message':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    print(serializer.validated_data)
    obj = SupervisorModel.objects.create(
        username=serializer.validated_data['username'],   
        password=serializer.validated_data['password'], 
        email=serializer.validated_data['email'],
        mobile_no=serializer.validated_data['mobile_no'],
        profile_pic=serializer.validated_data['profile_pic']  
    )
    return Response(data={'message': 'registered successfully'},status=200)





def update_supervisor(request,user_id):
    try:
        supervisor = SupervisorModel.objects.get(id=user_id)
    except SupervisorModel.DoesNotExist as e:
        return Response(data={' message':' Supervisor does not exist'},status=400)
    except Exception as e:
        return Response(data={' message':'Databse error'},status=400)

    if ('username' in request.data)== False:
        return Response(data={' message':'Username key not provided'},status=400)
    
    if ('password' in request.data)== False:
        return Response(data={'message':'password key not provided'},status=400)
    if ('email' in request.data)== False:
        return Response(data={' message':'email key not provided'},status=400)

    if('mobile_no' in request.data)== False:
        return Response(data={' message':'mobile_no key not provided'},status=400)

    if SupervisorModel.objects.filter(username=request.data['username']).count()>0 and supervisor.username!=request.data['username']:
        return Response(data={' message':'There is already a supervisor with this username'},status=400)

    supervisor.username=request.data['username']
    supervisor.password=request.data['password']
    supervisor.email = request.data['email']
    supervisor.mobile_no=request.data['mobile_no']
    supervisor.save(update_fields=['username','email','password','mobile_no'])
    return Response(data={'message':' Successfully updated details'},status=200)    


    

@api_view(('GET','POST','DELETE','PUT')) 
def supervisors(request):
    operation = request.GET.get('operation')
    if operation =='get':
        id = request.GET.get('id')
        if id==None:
            return all_supervisors(request)
        return one_supervisor(request,id)
    if operation =='add':
        return register_supervisor(request)
    if operation =='delete':
        id = request.GET.get('id')
        if id ==None:
            return Response(data={'message':'id not found in url'},status=400)
        return delete_supervisor(request,id)
    if operation =='update':
        id = request.GET.get('id')
        if id ==None:
            return Response(data={'message':'id not found in url'},status=400)
        return update_supervisor(request,id)
    return Response(data={"message":"url not found"},status=400)




######################################
""" section for customers"""

def update_customer_status(id):
    if CustomerModel.objects.filter(id=id).count()==0:
        return Response(data={'message':'Customer not found'})
    
    customer = CustomerModel.objects.get(id=id)
    if customer.status:
        customer.status= False
    else:
        customer.status= True
    customer.save(update_fields=['status'])
    return Response(data={"message":'updated successfully'},status=status.HTTP_200_OK)




def register_customer(request):
    data=request.data

    serializer= RegisterSerializerCustomer(data=data)

    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={'message':str(e)},status=400)

    if CustomerModel.objects.filter(username=serializer.validated_data['username']).count() > 0:
        return Response(data={'message':'A customer with the specified username already exists'},status=400)
    serializer.save()
    return Response(data={'message':'Registered Successfully'},status=status.HTTP_200_OK)

   
def one_customer(request,user_id):
    pics=CustomerModel.objects.get(id=user_id)
    serializer=CutomerSerializer(pics)
    return Response(serializer.data)

def update_customer(request,user_id):
    serializer= RegisterSerializerCustomer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={"message":str(e)},status=status.HTTP_400_BAD_REQUEST)
    try:
        instance= CustomerModel.objects.get(id=request.data['id'])
    except Exception as e:
        return Response(data={"message":str(e)},status=status.HTTP_400_BAD_REQUEST)

    if CustomerModel.objects.filter(id=user_id).count() > 0 and instance.username !=serializer.validated_data['username']:
        return Response(data={'message':'A customer with the specified username already exists'},status=400)
    try:
        connection = Connections.objects.get(username=instance.username)
    except Exception as e:
        return Response(data={'message':'internal server error'}, status=400)
   
    instance.username = serializer.validated_data['username']
    instance.password = serializer.validated_data['password']
    instance.email = serializer.validated_data['email']
    instance.status =serializer.validated_data['status']
    instance.mobile_no = serializer.validated_data['mobile_no']
    instance.address = serializer.validated_data['address']
    instance.subscription= serializer.validated_data['subscription']
    
    
    connection.username = serializer.validated_data['username']

    connection.save(update_fields=['username'])
    instance.save(update_fields=['username','email','password','status','mobile_no','address','subscription'])
    return Response(data={'message':'updated successfully'},status=200)


def all_customers(request):
    pics=CustomerModel.objects.all()
    data= CutomerSerializer(pics,many=True)
    response =[]
    for customer in data.data:
        new_customer = customer 
        connection = Connections.objects.get(username=customer['username'])
        new_customer['linked_meter']=connection.meter_name
        
        response.append(new_customer)
    print(response)
    return Response(data=response,status=200)

def delete_customer(request,user_id):
    try:
        tutorial = CustomerModel.objects.get(id=user_id) 
    except Exception as e:
        return Response(data={'message':'database confilict'},status=400)
    if request.method == 'DELETE': 
        if tutorial.linked==True:
            connection = Connections.objects.get(username=tutorial.username)
            if connection.meter_name!="Not Selected" or Meters.objects.filter(meter_name=connection.meter_name).count()>0:
                meters = Meters.objects.get(meter_name=connection.meter_name)
                meters.linked=False
            tutorial.delete() 
            connection.delete()
        
        return Response(data={'message': 'Customer removed successfully!'}, status=status.HTTP_204_NO_CONTENT)
        


def countcustomers(request):
    count1=CustomerModel.objects.all().count()
    count2=CustomerModel.objects.filter(status=True).count()
    count3= CustomerModel.objects.filter(linked=True).count()
    return Response({
        "totalcustomers":count1,
        "activecustomers":count2,
        'linkedcustomers':count3
        })


@api_view(('GET','POST','DELETE','PUT'))
def customers(request):
    
    operation=request.GET.get('operation')
    if operation=="get":
        id = request.GET.get('id')
        if id==None:
            return all_customers(request)
        return one_customer(request,id)
    if operation=='add':
        return register_customer(request)
    if operation=="update":
        id = request.GET.get('id')
        if id == None:
          return Response(data={'message':'user id not specified'},status=400)  
        return update_customer(request,id)
    if operation=="delete":
        id = request.GET.get('id')
        if id==None:
            return Response(data={'message':'user id not specified'},status=400)
        return delete_customer(request,id)
    if operation=="updatestatus":
        id = request.GET.get('id')
        return update_customer_status(id)
    if operation == "count":
        return countcustomers(request)
    return Response({"maessage":"bad request"},status=status.HTTP_400_BAD_REQUEST)











################################################################################################
"""
section for operation on meters and readings
"""




def all_meters(request):
    pics=Meters.objects.filter(linked=False)
    serializer=AllMeterSerializer(pics,many=True)
    return Response(serializer.data)

def RegisterMeter(request):
    data={}
    data['meter_name']=request.data['meter_name']
    data['meter_url']=request.data['meter_url']
    if 'working' in request.data.keys():
        data['working']=request.data['working']
    else:
        data['working']=True
    
    
    if Meters.objects.filter(meter_name=data['meter_name']).count()>0:
        return Response(data={'message':"A meter already exists with this name"},status=400)
    
    meter_serializer=MeterSerializer(data=data)
    try:
        meter_serializer.is_valid(raise_exception=True)        
    except Exception as e:
        Response(data={"message":str(e)})
    user=meter_serializer.save() 
    return Response(data=meter_serializer.validated_data,status=200)



# get one meter connection
def get_onemeter(request,id):
    pics=Meters.objects.get(id=id)
    serializer=MeterSerializer(pics)
    return Response(serializer.data)

# update meter connections
def getmeters(request):
    pics=Meters.objects.all()
    serializer=MeterSerializer(pics,many=True)
    return Response(serializer.data)


def updatemeter(request):
    if request.data['id'] == '':
        return Response(data={'message':"id is required"},status=400)
    id=request.data['id']
    meter=Meters.objects.get(id=id)
    serializer= MeterSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={"message":e})
    if Meters.objects.filter(meter_name=request.data['meter_name']).count()>0 and meter.meter_name!=request.data['meter_name']:
        return Response(data={'message':"A meter already exists with this name"},status=400)
    try:
        connection = Connections.objects.get(meter_name=meter.meter_name)
    except Exception as e:
        return Response(data={'message':'something went wrong in database'},status=400)

    connection.meter_name=serializer.validated_data['meter_name']
    
    meter.meter_name=serializer.validated_data['meter_name']
    meter.meter_url=serializer.validated_data['meter_url']
    meter.working=serializer.validated_data['working']
    connection.save(update_fields=['meter_name'])
    meter.save(update_fields=['meter_name', 'meter_url','working']) 
    return Response(data=serializer.data,status=200)


def insert_reading(request):
    data=request.data
    meter_id = data['meter_id']
    reading_value=data['reading_value']
    time_stamp = datetime.strptime(data['time_stamp'], '%Y-%m-%d') 
    new_data = { "meter_id":meter_id, "reading_value":reading_value, "time_stamp":time_stamp}
    serializer=MeterReadingsSerializer(data=new_data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        print(e)
        return Response(data={"message":e})
    serializer.save()
    return Response(serializer.data,status=200)


def get_readings(request):
    meter_id = request.data['meter_id']
    readings = Meter_Readings.objects.filter(meter_id=meter_id)
    serializer = MeterReadingsSerializer(readings,many=True)
    return Response(data=serializer.data,status=200)


from datetime import timedelta, date
from numpy import random
import pandas as pd
def daterange(date1, date2):
    for n in range(int ((date2 - date1).days)+1):
        yield date1 + timedelta(n)



def insert_dummy_data(request):
    meter_id = request.data['meter_id']
    start_date=datetime.strptime(str(request.data['start_date']),"%Y-%m-%d")
    end_date=datetime.strptime(str(request.data['end_date']),"%Y-%m-%d")
    date_list=daterange(start_date,end_date)
    reading_list=[]
    df=pd.DataFrame(date_list, columns=['time_stamp'])
    
    variation= [7,15,13,10,-4,-5,6,-7]
    for i in range(0,len(df)):
        base_reading=i*10
        x=random.choice(variation)
        reading_value=base_reading+x
        time_stamp = df['time_stamp'].iloc[i]
        new_data = { "meter_id":meter_id, "reading_value":reading_value, "time_stamp":time_stamp}
        serializer=MeterReadingsSerializer(data=new_data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(e)
            return Response(data={"message":e})
        serializer.save()
        reading_list.append(reading_value)
    df['reading_value']=reading_list
    return Response(data=df.to_json())



def delete_meter(request):
    id = request.GET.get('id')
    if id == '':
        return Response(data={'message':"meter is not supplied"})
    try:
        meter = Meters.objects.get(id=id)
    except Meters.DoesNotExist:
        return Response(data={'message':"meter is already deleted from database"},status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response(data={'message':e},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if Connections.objects.filter(meter_name=meter.meter_name).count() > 0:
        connection = Connections.objects.get(meter_name=meter.meter_name)
        customer = CustomerModel.objects.get(username=connection.username)
        customer.linked=False
        connection.meter_name="Not Selected"
        connection.save(update_fields=['meter_name'])
        customer.save(update_fields=['linked'])
    if Meter_Readings.objects.filter(meter_id=meter.id).count() > 0:
        readings = Meter_Readings.objects.filter(meter_id=meter.id)
        readings.delete()
    meter.delete()
    return Response(data={'message':"successfully deleted"},status=status.HTTP_204_NO_CONTENT)

def get_counts(request):
    count1=Meters.objects.all().count()
    count2= Meters.objects.filter(linked=True).count()
    return Response(data={'all':count1,"linked":count2},status=status.HTTP_200_OK)
    

@api_view(('GET','POST','DELETE','PUT'))
def meters(request):
    operation = request.GET.get('operation')
    print(operation)
    print(request.GET.get('id'))
    if operation=="get":
        id= request.GET.get('id')
        if id ==None:
            return getmeters(request)
        return get_onemeter(request,id)
    if operation=="add" and request.method == 'POST':
        return RegisterMeter(request)
    if operation=="delete":
        return delete_meter(request)
    if operation=="update":
        if request.method == 'POST' or request.method == 'PUT':
            return  updatemeter(request)
    if operation=="insertreading" and request.method == 'POST':
        return insert_reading(request)
    if operation=="insertdummy":
        return insert_dummy_data(request)
    if operation=="getreadings":
        return get_readings(request)
    if operation=="counts":
        return get_counts(request)
    if operation=="getfilter":
        return all_meters(request)
    return Response(data={"message":'invalid operation'}, status=400)

