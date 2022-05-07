SHELL := /bin/bash
PWD:=$(shell pwd)

start_db:
	@echo "Starting database..."
	. ${PWD}/.env.database; \
		docker run --name flight-db -p 5432:5432 \
		-e POSTGRES_PASSWORD=$${POSTGRES_PASSWORD} \
		-e POSTGRES_DB=$${POSTGRES_DB} \
		-e POSTGRES_USER=$${POSTGRES_USER} -d postgres
	@echo "Database started as container flight-db"

stop_db:
	@echo "Stopping database..."
	docker stop flight-db && docker rm flight-db
	@echo "Database stopped"

migrate_down:
	@echo "Undoing migrations"
	sequelize db:seed:undo:all
	sequelize db:migrate:undo:all
	@echo "Undoing migrations done"

migrate:
	@echo "Running migrations"
	sequelize db:migrate || true
	sequelize db:seed:all || true
	@echo "Migrations done"

start: migrate
	@echo "Starting server..."
	npm run watch:dev

clean_all_docker:
	@echo "docker container stop"
	docker container stop $(shell docker container ls -a -q) || true
	@echo "docker container remove"
	docker container rm -f $(shell docker container ls -a -q) || true
	@echo "docker images delete"
	docker image rmi -f $(shell docker images -q) || true
	@echo "docker volume prune"
	docker volume prune -f || true
	@echo "docker system prune"
	docker system prune -f || true
