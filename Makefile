network:
	docker network create net

volume:
	docker volume create db && docker volume create core_node_modules

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

log:
	docker logs --follow api

dev: down up log



