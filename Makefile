up:
	docker run -d -p 27017-27019:27017-27019 --name mongoose-validation-example mongo:4
down:
	docker stop mongoose-validation-example
	docker rm -v mongoose-validation-example

.PHONY: up down
