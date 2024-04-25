
   <p align="center"><h1 align="center">FINCRA TEST APPLICATION</h1></p>
    

## Description

This is a simple Wallet application built on the Nestjs framework, Prisma ORM and it uses PostgresQL for data storage.

## Installation Steps
unzip file and cd in the fincra-test folder, ensure to be in the same location where the package.json file is located, create a .env file in the root folder and copy the values below into it.

```bash

POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=test_db
POSTGRES_PORT=5432  

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT=5432  
}/${POSTGRES_DB}?schema=public"

```


Run the command below to install all dependencies

```bash 
$ npm install --save
```

Run the command below to sartup the database on port 5432

```bash 
$ docker compose up
```

Run the command below to migate the database tables to the created database

```bash 
$ npx prisma migrate dev
```

The command below is optional, but you can run it to monitor the database on your web browser

```bash 
$ npx prisma studio
```


## Running the app

```bash
# start application
$ npm run start:dev
```

open up your web browser and type `http://localhost:3000/graphql` to load the graphql playground.

