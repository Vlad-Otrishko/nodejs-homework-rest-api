<h1> THIS IS TUTORIAL PRODUCT TO GET BASIC EXPERIENCE OF WORK WITH MONGO DB </h1>
<h2> The application uses simple No-SQL data base, representing a kind of contact list. </h2> 

In order to use the application, the following steps are needed:
- register at https://www.mongodb.com/atlas/database
- create new project and set up a cluster
- use <a href='https://www.mongodb.com/try/download/compass'> MongoDB Compass </a> for convenient creating new database and adding new collection (if nesessary) from .JSON file.
Collection also may be created later manually, through POST method. 
- install <a href='https://www.postman.com/downloads/'>Postman </a>
- start the application by typing ***'npm run start'*** or ***'yarn start'*** in BASH-terminal (or similar).
- further, use Postman for listing, adding, deleteing and updating the contact - CRUD operations.<br>

Updated application implements registration and authentification (login) feature, which allows to protect contact data of each separate user via adding 'owner' attribute to each of the contacts being added to data base. Factually, this attribute represents key of the 'contact' instance. <br>

Here are the routs to be used (in the Postman) for registration, login and manupulating 'user' information <hr>
**POST method:** <br>
<localhost:3000/api/auth/signup> (adds the new user to 'users'. Some random avatar is assigned by default by 'gravatar' package) <br>
<localhost:3000/api/auth/login> (authenticates the existing user, generates token which is used for further work with contacts during one session, without need to login before each operation) <hr>
**GET metod:** <br>
<localhost:3000/api/users/current>(shows data of the current user) <br>
<localhost:3000/api/users/logout> (ends session og the curreny user) <hr>
**PATCH method:** <br>
<localhost:3000/api/users> (allows to change the subscription of the current user, request body contains only the subscription type) <br>
<localhost:3000/api/users/avatas> (allows to change avatar of the current user. request body should be 'form-data', field name(key) 'avatar', next field (value) can be used for selecting new avatar image) <hr>

***************************************************************************************
Here are the routs to be used (in the Postman) for manupulaation with contacts: <hr>
**GET metod:** <br>
<localhost:3000/api/contacts/>(lists all available contacts) <br>
<localhost:3000/api/contacts/[-id-]> (lists only one contact, with id selected ) <hr>

**POST method:** <br>
<localhost:3000/api/contacts/> (adds the new contact to collection. When building the request body for adding, kindly have in mind that 'name', 'email', 'phone' fields are all required and cannot be omitted ) <hr>

**PATCH method:** <br>
<localhost:3000/api/contacts/[-id-]/favorite> (in this application it is designed to edit only one field "favorite" of any selected contact by setting this parmeter to "true" or "false") <hr>

**PUT method:** <br>
<localhost:3000/api/contacts/[-id-]> (amends/ adds multiple fields of the contact selected by id ) <hr>

**DELETE method:** <br>
<localhost:3000/api/contacts/[-id-]> (deletes the chosen contact)

