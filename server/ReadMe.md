# To start the Server first start the Db

## To start the DB run the below 2 commands

`make start_db`

`make migrate`

## To stop the DB run the below command

`make stop_db`

Once the DB is up and running, check using `docker ps` command, it should show flight-db container.

## Start the server

First install all the npm dependencies

`npm i`

Then to start server in development mode

`npm run watch:dev`

If you want to start the server in production mode.

`npm start`
