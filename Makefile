.PHONY: dev prod clean stop

dev:
	docker compose --profile dev up

prod:
	docker compose up --detach

clean:
	docker system prune -a

stop:
	docker stop $(shell docker ps -a -q)
