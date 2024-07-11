.PHONY: dev e2e prod clean stop enter 

dev:
	docker compose --profile dev up

e2e:
	docker compose -f compose.e2e.yaml up

prod:
	docker compose up --detach

clean:
	docker system prune -a

stop:
	docker stop $(shell docker ps -a -q)

enter:
	docker exec -it $(target) sh