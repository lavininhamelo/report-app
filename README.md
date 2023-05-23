# Report Application

## How to run the API

On the API folder (system)

1. Run the docker-compose command
`docker-compose up`

2. Run the migrations 
(it is really important to run the migrations before testing the application on the web server)

`docker-compose run mc-app yarn migrate-initial`

3. The server will be started on the 3333 port.

## How to run the APP

On the APP folder (webapp)

1. Run the docker-compose command
`docker-compose up`

2. The server will be started on the 4173 port.

3. You can run the tests using the following command:
`docker-compose run mc-web yarn test`
