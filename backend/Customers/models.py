

# Create your models here.
from django.db import models
class CustomerModel(models.Model):
	username= models.CharField(max_length=10)
	email=models.CharField(max_length=20)
	password=models.CharField(max_length=10)
	status=models.CharField(max_length=20)

	def __str__(self): # used so as to return post title when we use shell to view the post from database
		return self.username+self.email+self.password+self.status 


class Authorization(models.Model):
	username= models.CharField(max_length=255)
	token=models.CharField(max_length=255)
	session_start_date= models.FloatField()
	session_expirey_date= models.FloatField()

	def __str__(self):
		return self.username + self.token + self.session_start_date + self.session_expirey_date
