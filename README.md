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
1. Clone the project to your machine ```[https://github.com/Abhis-123/Mallmetering.git]```
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
The homepage has information cards on total customers , total active customers, total consumption, Meters, linked meters.
On clicking each tab, you are directed to the respective page; on clicking active customers you will be redirected to page where all active customers are displayed.
There is chart also in this section which shows the CounsumptionSummary of all customers
![Homepage image](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/frontend/sreenshots/Dashboard.png)
### Customer Tab
This section  has a table of all the customers present in databse within table we can sort ,delete and filter customers
there is + icon on the right top corner  by clicking on that icon we can add new  customers and there is a edit button on each row 
![Customer Table image](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093248.png)
view button has not been implemented
Add customer page in superadmin section 
![Register Customer](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093344.png)

### Supervisor Tab
Supervisors can link meters to the customers and in this section we have table of supervisors.Here we can edit and delete supervisors . 
![Supervisor Table Image](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093424.png)

By Clicking on + button on right corner of the table we can  navigate to register supervisor page where we can add new  supervisors.

###  **Test Data
Over here, you can generate test data for meters, you have to select the date range for them. There is a dropdown for selecting meters and it has search functionality too
![test data image](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093458.png)
This data is stored in Meter_readings database, which is accessed by dashboard to plot graph 

### Configuration
It has Dropdown items, like:
#### Meters: 
This section has table of meter connections which are registered in databse .Here we can edit meters and delete meters. 
in table meter name column contains the meter name and url contains the meter url.
There is one more column which shows weather meter is linked to a customer or not 

![Meter Table](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093518.png)

By clicking on + button we can create(add) new meter connection to the application flow.
#### Archieve Data
This section is for cleaning the meter_reading table. In this section-
we have to select two dates for the time range , and a perticular meter. The meter_readings will be fetched from database and will be downloded to  your system in csv or json format as per selection.
You  can select the delete option also which will delete those redings from DB along with fetching.

![Archive data Image](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20094020.png)

#### Memory Usage
This section contains the dedtails regrading the disk storage used by various tables
![Memory Usage Details](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20093956.png)

### Profile 
Here it is displayed your profile picture along with your name. On clicking the profile dropdown, you can view and edit your profile.
Also logout option is there for logging out.
in then profile section you can se and edit details inline.
![Profile Section](https://raw.githubusercontent.com/Abhis-123/Mallmetering/main/frontend/sreenshots/Screenshot%202021-07-06%20094040.png)
_________________________________________________________________________________________________
## **Supervisor**
As you login to suoervisor, You will be directed to the Supervisor Dashboard.
On the Screen, Connection list will be displayed where you can connect a meter to a customer.
The connection is one-one.
Also stats are visible like **Total customers,Active Customers,Total meters and Linked Meters**.
But these are not clickable.
On the navigation bar, you have **Dashboard:** to redirect to dashboard screen and **User Actions:** where Supervisor can edit their profile.
_________________________________________________________________________________________________

## **Customers**
As you login to Customer, You will be directed to the Customer Dashboard.
Over here, below the **Hello welcome message**, there are 2 graphs;

**Consumption graph**: 
Displays dates on X axis and Consumption per day on Y axis

**Billing graph.**:
Displays dates on X axis and Bill per day on Y axis
This may be similiar in shape with consumption graph if the value per watt consumption is constant.

Below the graphs is Consumption Summary Table, which displays Consumption corresponding to that date.
Below this is Billing Summary Table, which displays Billing corresponding to that date.

On the top, there are stats, where **Customers that day's usage, that day's bill, tariff plan** are diaplayed.

On the top **Navigation Bar** we have;

**Dashboard:**
To redirect to Dashboard. 

**Billing:**
To display the customers montly Bill

**Invoice:**
To diaplay the Customer's Montly Invoice.

**User Actions:**
Over here Customer can view and edit his profile.

# Backend of Mall Metering Project

 This part of document having all the instructions to build the project and description of all apis used in this backend.
### Requirements
    . This project built with python v 3.7 
    . pip version 20.2
    
### Virtual Environment
We need to create an virtual environment for running our django projects. This is also where we will be installing our python libraries.

Installing Virtual environment:

     python3 -m pip install --user virtualenv
    
Creating Virtual environment:

     py -m venv env
    
Activating Virtual environment:

     .\env\Scripts\activate
     

### Installation Instructions:
    First clone the project and type the following commands
     1. cd "internmallmetering/backend/"
     2. pip install (The requirements.txt file contains all the requirements)
     
### DataBase Setup Instructions: 
Now for the Database connectivity, we will be using Postgresql database. 
So You need to download **Postgresql** in your system. (Download the version suitable with your device)

**Link:** https://www.postgresql.org/download/
Also to view your database, You would need to download **pgadmin**.
**Link:** https://www.pgadmin.org/download/

Create a Database in pgadmin, lets say with name **"XXXX"**
Now, After you have cloned the code, in the internmallmetering => backend => Metering Project => **settings.py** , change the database name to above, **"XXXX"** in this case.

### Setting Up Datatables in Postgresql Instructions: 
Navigate to the backend file. Now follow these steps:

    python manage.py makemigrations Superadmin

This will show in your cmd, all the migrations made, like **Create SuperadminModel, Create SupervisorModel,...**
Similarly the below migartions will display the Create model names.

    
    python manage.py makemigrations Subadmins
    python manage.py makemigrations Customers
    
After That,
 
    python manage.py migrate
    
This will **create the database tables** for you.
You can view and confirm the creation of datatables in pgadmin.

Now, finally, to run the python django backend, enter 

    python manage.py runserver
    
(For Server, it is " python manage.py runserver xxx.xxx.xx.xx:YYYY " , 
where, xxx.xxx.xx.xx:YYYY is ip address along with port number on which you are running your project. 


## Api functionalities In Metering Mall Project

### Customers

#### Login Api for customers
    Input -> input is a json object containing key/value pairs as username and password
    response -> status= 200  ,data includes username , Authentication key and its expiration date
                status = 400 , data contains message A
**customers**
Has again **get, deleted and update** functions. Each accepts a **username and a request** for functionality.
**Update** takes in the username and request passed from customers, to update the data of the customer.
In the case of a username , it should be updated in both the customer and connections table.
**Delete** takes in the username and request passed from customers, to delete the data of the customer.
It should be deleted in both the customer and connections table, and updating the meter link status to not be linked in the meters table.

**Getreadings**
Accepts **username and request** to give readings from datatable; this gives readings only of those meters to which the user is linked with.
**If M1 is linked with user AAAA, it should only filter out the M1 readings from the table.**

**Usage**
Gives the **latest value of the meter reading** of that meter to which the user is linked. 
If M1 in the above case has the latest reading 162 in the table, it should only return 162 .

____________________________________________________________________________

### Subadmins:

#### Login Api for supervisors
    Input -> input is a json object containing key/value pairs as username and password
    response -> status= 200  ,data includes username , Authentication key and its expiration date
                status = 400 , data contains message A

**Login**
Pass username and password.  Also creates data in the authorization table for authorization    purposes.

**One_supervisor**
Fetches one supervisor’s data from the backend using the request and username from the Admin_supervisor table.

**Update_supervisor**
Update takes in the username and request passed from supervisors, to update the data of the supervisor.

**Update_connection**
Used to update a connection in the connection table.
If the customer was linked with M1, and now the supervisor updates the linkage to M2, then we need to update the connection table, change meter_name to M2; and in meters table link_status will be true for M2 and false for M1. 

**All_connections**
Gets all connections from the connections table in the database, to be displayed in the Connection table of the supervisor.


____________________________________________________________________________

### Superadmin:

**RegisterApi**
This is the api which is used to start the application. By this api we need to register a super admin first ->  
It takes the following inputs   -> username , email,password, mobile_no  and an image for profile ( all are important and need to be created ). This is done only once after migrating the db.

**AdminLogin**
Input is a password becuse it has only one superadmin .Also creates data in the authorization table for authorization    purposes. If some error is there, the appropriate error status is displayed.

**Dashboard**
Has many functions within it; 
**getadmin()** => used to get admin data whose id=1 from the database, as only one super admin is required.
**isAuthenticated()** => used for generation of authorization token 
**get_consumption_summary()** => gets data from Meter_Reading tables for customers
**statsdata()** => used to get active/linked customers and meters

**Config**
Has **memory()**, which gets data like byte usage by every data table and ram consumption; and has **archive_data()** for deleting or posting to an excel sheet the data selected between dates.  

**Profile**
Has **get()** , to get data of super admin functionality and **update()** to update the super admin functionality.
Also there is one **change_password()** functionality, to change the superadmins password.

**Supervisors**
Has supervisor operations like;
**get()** => to get all supervisor data
If id is passed, then fetches data from one supervisor with that id through **one_supervisor()** function, or else through **all_supervisors()** fetches data for all supervisors.

**add()** =>to add a supervisor to database
Used for registering Supervisor in Supervisor Database, through **register_supervisor()**

**delete()** => to delete supervisor from database
Accepts an request and user_id. Uses this user_id to delete the supervisor with specified user_id, through **delete_supervisor().**

**update()** => to update supervisor info in database
Accepts request and user_id.  Uses this user_id to delete the supervisor with specified user_id,
through **update_supervisor().**

Both the above update and delete, have **validations** to check if user_id is valid, if password, username, ..  are valid for update.

**Customers**
**get()**=> to get all customer data
If id is passed, then fetches data from one customer with that id through **one_customer()** function, or else through **all_customers()** fetches data for all customers.

**add()** =>to add a customer to database
Used for registering Customer in Customer Database, through **register_customer()**

**delete()** => to delete customer from database
Accepts an request and user_id. Uses this user_id to delete the customer with specified user_id, through **delete_customer().**

**update()** => to update customer info in database
Accepts request and user_id.  Uses this user_id to delete the customer with specified user_id,
through **update_customer().**

Both the above update and delete, have **validations** to check if user_id is valid, if password, username, ..  are valid for update.


**Meters**
**get()** => to get meter data
If id is passed, then fetches data from one meter with that id through **one_meter()** function, or else through **all_meters()** fetches data for all meters.

**add()** =>to add a meter to database
Used for registering meter in Meters Database, through **register_meter()**

**delete()** => to delete meter from database
Accepts an request and user_id. Uses this user_id to delete the meter with specified user_id, through **delete_meter().**

**update()** => to update meter info in database
Accepts request and user_id.  Uses this user_id to delete the meter with specified user_id,
through **update_meter().**

Both the above update and delete, have **validations** to check if user_id is valid, if metername, url, ..  are valid for update.

**insert_reading()** => to insert a meter reading for a meter . It requiers meter_id
and reading value ,as time_stamp will be taken present if not supplied.

**insert_dummy_data()**=> By This opration we can generate a dummy data for meter 
it requires three input fields 1. meter_id, start_date , end_date  
start and end dates are upper and lower bounds for dates for generating readings.


























