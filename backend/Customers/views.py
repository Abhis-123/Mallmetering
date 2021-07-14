from uuid import uuid4
from Superadmin.models import CustomerModel,Meters,Meter_Readings
from Subadmins.models import Connections
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Authorization
import datetime
from datetime import datetime
from .serializers import CustomerSerializer,RegisterSerializerCustomer,Readings

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
        user= CustomerModel.objects.get(username=username)
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



@api_view(('GET','POST','DELETE','PUT'))
def customers(request):
    
    operation=request.GET.get('operation')
    if operation=="get":
        username = request.GET.get('username')
        if username==None:
            return Response(data={'message':'username not specified'},status=400)
        return one_customer(request,username)

    if operation=="update":
        username = request.GET.get('username')
        if username == None:
          return Response(data={'message':'user name not specified'},status=400)  
        return update_customer(request,username)
    if operation=="delete":
        id = request.GET.get('username')
        if id==None:
            return Response(data={'message':'username not specified'},status=400)
        return delete_customer(request,id)
    
def one_customer(request,username):
    pics=CustomerModel.objects.get(username=username)
    serializer=CustomerSerializer(pics)
    return Response(serializer.data)

def update_customer(request,username):
    print(")))))))))))))))))))")
    print(username)
    serializer= RegisterSerializerCustomer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response(data={"message":str(e)},status=400)
    try:
        instance= CustomerModel.objects.get(username=username)
    except Exception as e:
        return Response(data={"message":str(e)},status=400)

    if CustomerModel.objects.filter(username=serializer.validated_data['username']).count() > 1 :
        return Response(data={'message':'A customer with the specified username already exists'},status=400)
    try:
        connection = Connections.objects.get(username=username)
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




def delete_customer(request,username):
    
    tutorial = CustomerModel.objects.get(username=username) 
 
    if request.method == 'DELETE': 
        tutorial.delete() 
        return Response(data={'message': 'Customer removed successfully!'}, status=204)
        
@api_view(('GET',))
def getreadings(request,username):
    print("DDDDDDDDDDDDDDDDDDDDDDDD")
    print(username)
    obj=Connections.objects.get(username=username)
    metername=obj.meter_name
    if(metername=="Not Selected"):
        return Response({
        "message":"Meter not found"
        })
    m=Meters.objects.get(meter_name=metername)
    ID=m.id
    if(Meter_Readings.objects.filter(meter_id=ID).exists()):
        usage=Meter_Readings.objects.filter(meter_id=ID).all()
        serializer=Readings(usage,many=True)
        return Response(serializer.data)
        
    return Response({
        "message":"Meter readings not found"
        })


@api_view(('GET',))
def usage(request,username):
    print("DDDDDDDDDDDDDDDDDDDDDDDD")
    print(username)
    obj=Connections.objects.get(username=username)
    metername=obj.meter_name
    m=Meters.objects.get(meter_name=metername)
    ID=m.id
    if(Meter_Readings.objects.filter(meter_id=ID).exists()):
        usage=Meter_Readings.objects.filter(meter_id=ID).order_by('-id')[0]
        serializer=Readings(usage)
        return Response(serializer.data)
        
    return Response({
        "message":"Meter readings not found"
        })