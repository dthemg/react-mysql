# CRUD example with React, Express and MySQL

Simple demo of an Express REST API implementing CRUD functionality (Create, Read, Update, Delete).

![CRUD](https://github.com/dthemg/react-mysql/blob/master/assets/CRUD.PNG)

## MySQL server

Setup an empty MySQL table with string fields `name` and `weight` and an autoincrement `id` called `fruitlist`.

## Express API
Add a folder called `config` in the `sql-api` folder. In this folder att a file `config.js` with your credentials like:
```
module.exports = {
	host: 'localhost',
	user: 'root',
	password: 'my-password',
	database: 'my-db'
}
```
To start the API, run `npm start` from within the `sql-api` folder. 

## Frontend
To start the frontend, run `npm start` from within the `crud-client` folder.
