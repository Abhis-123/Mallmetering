

# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from uuid import uuid4
import os
def path_and_rename(instance, filename):
	
    upload_to = 'images'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)




class Superadmin(models.Model):
	username= models.CharField(max_length=255)
	email=models.CharField(max_length=256)
	password=models.CharField(max_length=256)
	profile_pic=models.ImageField(upload_to=path_and_rename,default="defaultprofilepic.jpg",blank=True, null=True)
	join_date=models.DateField(auto_now_add=True)
	mobile_no= models.CharField(max_length=255)
	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username+self.email+self.password + self.profile_pic+self.mobile_no + self.join_date

class Memory(models.Model):
	Type= models.CharField(max_length=100)
	memory=models.FloatField()
	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.Type+self.memory


class SupervisorModel(models.Model):
	username=models.CharField(max_length=255)
	email=models.CharField(max_length=255)
	password=models.CharField(max_length=255)
	profile_pic=models.ImageField(upload_to=path_and_rename,default="defaultprofilepic.jpg")
	mobile_no= models.CharField(max_length=255)
	time_stamp= models.DateTimeField(auto_now_add=True)
	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username + self.email + self.password + self.profile_pic 


class CustomerModel(models.Model):
	username= models.CharField(max_length=255)
	email=models.CharField(max_length=255)
	password=models.CharField(max_length=255)
	status=models.BooleanField(default=False)
	mobile_no= models.CharField(max_length=255)
	address=models.CharField(max_length=1024)
	subscription= models.CharField(max_length=2)
	time_stamp=models.DateTimeField(auto_now_add=True)
	profile_pic=models.ImageField(upload_to=path_and_rename,default="defaultprofilepic.jpg")
	linked=models.BooleanField(default=False)
	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username + self.email + self.password + self.mobile_no + self.address + self.subscription +self.profile_pic



# Create your models here.
class Meters(models.Model):
    meter_name= models.CharField(max_length=255)
    meter_url=models.CharField(max_length=512)
    working=models.BooleanField(default=True)
    linked = models.BooleanField(default=False)
    def __str__(self):
        return self.meter_name + self.meter_url + self.working + self.linked 


class Meter_Readings(models.Model):
        meter_id = models.BigIntegerField()
        reading_value= models.IntegerField()
        time_stamp = models.DateTimeField()

        def __str__(self):
            return self.meter_id + self.reading_value 


class Authorization(models.Model):
	username= models.CharField(max_length=255)
	token=models.CharField(max_length=255)
	session_start_date= models.FloatField()
	session_expirey_date= models.FloatField()

	def __str__(self):
		return self.username + self.token + self.session_start_date + self.session_expirey_date