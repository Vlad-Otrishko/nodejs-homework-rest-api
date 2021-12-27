<h1> THIS IS TUTORIAL PRODUCT TO GET BASIC EXPERIENCE OF WORK WITH MONGO DB </h1>
<h2> The application uses simple No-SQL data base, representing a kind of contact list. </h2> 

In order to use the application, the following steps are needed:
- register at https://www.mongodb.com/atlas/database
- create new project and set up a cluster
- use <a href='https://www.mongodb.com/try/download/compass'> MongoDB Compass </a> for convenient creating new database and adding new collection (if nesessary) from .JSON file.
Collection also may be created later manually, through POST method. 
- install <a href='https://www.postman.com/downloads/'>Postman </a>
- start the application by typing ***'npm run start'*** or ***'yarn start'*** in BASH-terminal (or similar).
- further, use Postman for listing, adding, deleteing and updating the contact - CRUD operations.

Here are the routs to be used (in the Postman): 
***GET metod:***
**localhost:3000/api/contacts/ **(lists all available contacts)
**localhost:3000/api/contacts/[-id-] ** (lists only one contact, wit id selected )

***POST method:***
**localhost:3000/api/contacts/  **(adds the new contact to collection. When building the request body for adding, kindly have in mind that 'name', 'email', 'phone' fields are all required and cannot be omitted )

***PATCH method:***
**localhost:3000/api/contacts/[-id-]/favorite** (in this application it is designed to edit only one field "favorite" of any selected contact by setting this parmeter to "true" or "false")

***PUT method:***
**localhost:3000/api/contacts/[-id-]** (amends/ adds multiple fields of the contact selected by id )

***DELETE method:***
**localhost:3000/api/contacts/[-id-]** (deletes the chosen contact)

