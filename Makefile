.PHONY: dev prod clean stop enter

dev:
	docker compose --profile dev up

prod:
	docker compose up --detach

clean:
	docker system prune -a

stop:
	docker stop $(shell docker ps -a -q)

enter:
	docker exec -it $(target) sh