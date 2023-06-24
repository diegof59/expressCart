![expressCart](https://raw.githubusercontent.com/mrvautin/expressCart/master/public/images/logo.png)

Check out the documentation [here](https://github.com/mrvautin/expressCart/wiki).

View the demo shop [here](https://expresscart-demo.markmoffat.com/).

## About

This is a fork of mrvautin's expressCart. I fixed the deployment on Docker by updating the Dockerfile and docker-compose.yaml (now docker-compose.dev.yaml). I added a Dockerfile.test and changed the docker-compose.yaml to deploy a testing environment. The initial goal of this project is to implement test cases, both functional and non-functional.

--

Este es un fork de expressCart de mrvautin. He arreglado el despliegue sobre Docker, actualizando los Dockerfile y docker-compose.yaml(ahora docker-compose.dev.yaml). He agregado un Dockerfile.test y cambiado el docker-compose.yaml para desplegar un ambiente de pruebas. El objetivo inicial de este proyecto es implementar casos de prueba, tanto funcionales como no funcionales.

## Installation

* Clone the repository in the desired parent folder: `git clone`

* Install dependencies: 
  * On host app folder: `npm install`

* Install docker and docker compose (latest version so it supports docker-compose.yaml format v3)
* On the .env file, replace USER and GROUP With your linux user and group id or name (run `id` on terminal to get them)

* Build the application:
  * On app folder: `docker compose build --progress plain`

## Run the application

* Populate the database with test data:
  * On app folder: `docker compose exec expresscart npm run testdata`

Test data is defined on: `lib/testdata.js`. We don't insert users as we don't know the admin password.

* Run the application:
  * On app folder: `docker compose up`

Enter the application on `localhost:1111`
