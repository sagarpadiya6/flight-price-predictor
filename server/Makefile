PWD:=$(shell pwd)
SHELL := /bin/bash

start_db:
	@echo "Starting database..."
	@. ${PWD}/.env.database; \
		docker run --name flight-db -p 5432:5432 \
		-e POSTGRES_PASSWORD=$${POSTGRES_PASSWORD} \
		-e POSTGRES_DB=$${POSTGRES_DB} \
		-e POSTGRES_USER=$${POSTGRES_USER} -d postgres
	@echo "Database started as container flight-db"

stop_db:
	@echo "Stopping database..."
	@docker stop flight-db && docker rm flight-db
	@echo "Database stopped"

migrate:
	@echo "Running migrations"
	@sequelize db:migrate
	@echo "Migrations done"