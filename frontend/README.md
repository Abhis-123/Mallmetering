# Frontend of Mall Metering Project
This document contains all the instructions to build the project and description about the sections.
## Info. 
This is a application which can be used to monitor the electricity usage by households .It has three sections 
 1. Superadmin 
 2. Supervisor
 3. Customer

These sections will be discussed in detail in the document  but first let's have some instructions on building this project on your machine 

## Requirements for The frontend
* node 12.6.0 or yarn- v1.22.10
* python 3.5 or above for backend
* postgerss sql  version 4


## Getting started
1. Clone the project to your machine ```[https://gitlab.com/lvaidya/internmallmetering.git]```
2. Navigate into the diretory ```[cd internmallmetering]```
4. Navigate to backend directory ```[cd backend]```
5. Install the requirements ```[pip install (it will install all the requirements libraries for the project)]```
5. Navigate into the frontend directory ```[cd frontend]```
5. Install the dependencies for frontend ```[npm install]```
6. Install postgress sql on your system and create a databse named mallmetering.

## Run the application
You will need two terminals pointed to the frontend and backend directories to start the servers for this application.
1. First Step is to make sure that you have all the correct credentials in settings.py file like  databse name , password and server names.
2. Prepare migrations with command ```[python manage.py makemigrations]```
3. Migrate all the models ```[python manage.py migrate]```
4. Run this command to start the backend server in the ```[backend]``` directory: ```[python manage.py runserver]``` 
5. Navigate to frontend directory and type command ```[npm install]```
6. Start The React Developement Server with command ```[npm start]``` you can now see the project running at port 3000 or at address ```[http://localhost:3000/]```

## Superadmin Section  
This is the section of application with which we can control complete flow of the application it has multipule sections in it 
first is dashboard which is the homepage of superadmin 
### Homepage (Dashboard)
The homepage has information cards on total customers , total active customers, total consumption, Meters, linked meters
There is chart also in this section which shows the CounsumptionSummary of all customers
![Homepage image](https://gitlab.com/lvaidya/internmallmetering/-/raw/3d4eb73231bc24a60dff9a9e4280b587a1ec9088/frontend/sreenshots/Dashboard.png)
### Customer Section
This section  has a table of all the customers present in databse within table we can sort ,delete and filter customers
there is + icon on the right top corner  by clicking on that icon we can add new  customers and there is a edit button on each row 
![Homepage image](https://gitlab.com/lvaidya/internmallmetering/-/raw/3d4eb73231bc24a60dff9a9e4280b587a1ec9088/frontend/sreenshots/Screenshot%202021-07-06%20093248.png)

view button has not been implemented





















