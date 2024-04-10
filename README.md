# Backend for Role management system

Portal for admins to create and manage users

# Steps to run locally

1. Clone repo
2. run: npm install
3. make sure mongodb server is running
4. create a .env file in config folder with the following environemnt variables:
   
      MONGO_URI
      
      PORT
      
      SUPER_ADMIN_EMAIL
      
      SUPER_ADMIN_PASSWORD
      
      SUPER_ADMIN_FIRSTNAME
      
      SUPER_ADMIN_LASTNAME
      
      TOKEN_KEY
      
      DEFAULT_PASSWORD

6. run: npm run set-super-admin to create the initial user
7. run: npm start to start the server
