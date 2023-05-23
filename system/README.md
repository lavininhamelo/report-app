# How to run the API

1. Run the docker-compose command
`docker-compose up`

2. Run the migrations 
(it is really important to run the migrations before testing the application on the web server)

`docker-compose run mc-app yarn migrate-initial`

3. The server will be started on the 3333 port.