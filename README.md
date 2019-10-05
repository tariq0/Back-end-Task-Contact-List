# Contact list API DOC

## Contacts API

### ContactsController.getAllByUser

    gets all contacts for a specific user

* **URL:**

  /contacts/getList/

* **Method:**

  `GET` 
  
*  **Headers:**

   `authorization`

   `deviceToken`

   `fingerPrint`


* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 

   ```json
      {
          "message" : "success",
          "data":[
                    {
                        "firstName": "string",
                        "lastName": "string",
                        "email": "string",
                        "mobileNumber": [
                            "string"
                        ],
                        "createdAt": "date",
                        "userId": "string"
                        }
          ]
      }
   ```

  
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
       {
           "message" : "you are not authorized"
       }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
       {
           "message" : "connection error"
       }
    ```

<br>
<hr>
<br>


### ContactsController.getLatest

    gets latest five contacts for a specific user

* **URL:**

  /contacts/getLatest/

* **Method:**

  `GET` 
  
*  **Headers:**

    `authorization`

    `deviceToken`

    `fingerPrint`


* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 

   ```json
      {
          "message" : "success",
          "data":[
                    {
                        "firstName": "string",
                        "lastName": "string",
                        "email": "string",
                        "mobileNumber": [
                            "string"
                        ],
                        "createdAt": "date",
                        "userId": "string"
                        }
          ]
      }
   ```

  
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
       {
           "message" : "you are not authorized"
       }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
       {
           "message" : "connection error"
       }
    ```

<br>
<hr>
<br>


### ContactsController.addNewContact

    creates news contact

* **URL:**

  /contacts/addContact/

* **Method:**

  `POST` 
  
*  **Headers:**

   `Content-Type : application/json`

   `authorization`

   `deviceToken`

   `fingerPrint`

*  **Body:**
   * **Required:**

       `firstName`

       `lastName`

       `email`

       `mobileNumber`

   * **Content:**

   ```json
      {
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "mobileNumber": [
                "string"
            ]
      }
   ```

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 

   ```json
      {
          "message" : "success",
          "data":[
                    {
                        "firstName": "string",
                        "lastName": "string",
                        "email": "string",
                        "mobileNumber": [
                            "string"
                        ],
                        "createdAt": "date",
                        "userId": "string"
                        }
          ]
      }
   ```

  
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
       {
           "message" : ""
       }
    ```

  OR

  * **Code:** 409 CONFLICT <br />
    **Content:** 
    ```json
       {
           "message" : "email already exist"
       }
    ```

  OR

  * **Code:** 422 UPROCESSABLE ENTITY <br />
    **Content:** 
    ```json
       {
           "message" : "< field name > is not valid"
       }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
       {
           "message" : "connection error"
       }
    ```

* **Notes:**
  
   authentication tokens are sent by headers not
   on the body

   to test this API i have created user API
   with simple validation to signup users and
   give them authentication tokens 


---


## Users API

### AuthControl.getAll

    gets all users 

* **URL:**

  /auth/getUsers/

* **Method:**

  `GET` 
  

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 

   ```json
      [
          {
              "_id": "string",
              "name": "string",
              "authorization": "string",
              "deviceToken": "string",
              "fingerPrint": "string",
              "contactsIds": [
                  "string"
              ]
          }
      ]
   ```

  
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
       {
           "message" : "connection error"
       }
    ```

<br>
<hr>
<br>


### AuthControl.createUser

    creates new user it requires no authentication since its made to test contact list API

* **URL:**

  /contacts/signUp/

* **Method:**

  `POST` 
  
*  **Headers:**

    `Content-Type : application/json`


*  **Body:**
   * **Required:**

       `name`

       `authorization`

       `deviceToken`

        `fingerPrint`
       


   * **Content:**

   ```json
      {
            
            "name": "string",
            "authorization": "string",
            "deviceToken": "string",
            "fingerPrint": "string",
            "contactsIds": [
                "string"
            ]
     }
   ```



* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 

   ```json
      {
          "message" : "success"
      }
   ```

  
 
* **Error Response:**

  * **Code:** 409 CONFLICT <br />
    **Content:** 
    ```json
       {
           "message" : "please change <authorization>|<deviceToken>|<fingerPrint> value"
       }
    ```

  OR

  * **Code:** 422 UPROCESSABLE ENTITY <br />
    **Content:** 
    ```json
       {
           "message" : "<authorization>|<deviceToken>|<fingerPrint> is not valid"
       }
    ```

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** 
    ```json
       {
           "message" : "connection error"
       }
    ```

