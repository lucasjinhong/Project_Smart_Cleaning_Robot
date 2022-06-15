# Project Smart Cleaning Robot
Project's server-side code

## Amazon Web Service EC2
>Create a free [AWS EC2 Server](https://www.tutsmake.com/deploy-node-js-app-to-amazon-aws-ec2/)
  1. When you are done creating the server, just git pull this project into your linux
  2. You should start the server with [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)

## Database
>Create a free [MongoDb Atlas Database](https://www.mongodb.com/docs/atlas/getting-started/)

>Change the Database url of MongoDB
  1. Under the /src/db directory
  2. Inside the xx_mongoose file
  3. change the const url, **Both files need to be changed**
  4. If using mongodb Atlas, the const url is like
  ```js
  const url = 'mongodb+srv://username:'+ env.mongopw +'@cluster.ubcvr.mongodb.net/Database_Name?retryWrites=true&w=majority'
  ```
  5. **Username, Cluster, Database_Name must be changed**
  6. You can follow the [tutorial](https://www.mongodb.com/docs/atlas/getting-started/) to get the link of the database

## Environment Variable

1. Create a .env file in the main root directory
2. Insert the Variable below, **Variables must be capitalized**
3. MONGOPW can be ignored if not using MongoDB Atlas

| Variable | Desciption |
| -------- | ---------- |
| EMAIL    | Email to send user registration verification code |
| PASSWORD | The password of the email above |
| SECRET   | **='secret'** |
| MONGOPW  | The password of MongoDB Atlas | 
