

# Create your models here.
from django.db import models
'''class SupervisorModel(models.Model):
	username= models.CharField(max_length=10)
	email=models.CharField(max_length=20)
	password=models.CharField(max_length=10)
	

	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username+self.email+self.password'''

class MeterConnections(models.Model): # not used 
	username= models.CharField(max_length=10)
	meter_name=models.CharField(max_length=20)
	

	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username+self.meter_name


class Connections(models.Model):
	meter_name=models.CharField(max_length=20)
	time_stamp=models.DateTimeField(auto_now_add=True)
	username=models.CharField(max_length=20)

	

	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.time_stamp+self.meter_name+self.username



class Authorization(models.Model):
	username= models.CharField(max_length=255)
	token=models.CharField(max_length=255)
	session_start_date= models.FloatField()
	session_expirey_date= models.FloatField()

	def __str__(self):
		return self.username + self.token + self.session_start_date + self.session_expirey_date