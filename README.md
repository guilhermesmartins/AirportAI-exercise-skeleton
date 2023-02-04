# NodeJS test for Airport AI

This repository includes a NodeJS / Express / MongoDB skeleton app.

## Setup

Create a .env inspired by .env.example, then run

```
npm install
```

to install the dependencies. After that,

```
npm start:prod
```

to run in a simulated production mode, or

```
npm start:dev
```

to run in the development mode. If everything is ok, you should see a { "status": "UP" } message when you go to the health checker 'http://localhost:3000/health' on your browser or other request methods.

### Requirements

Make sure you have MongoDB installed and running on your computer (with the connection url in the .env) as well as NodeJS/NPM installed.

### Permissions
There is two types of users: agents and passengers. Passengers can only search for products, and for his own lost products. Agents can create, delete and list all products. You can create a agent/passenger in the /users POST, and a passenger mail is needed to create a lost product (as a agent).
