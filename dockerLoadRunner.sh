#!/bin/sh
# The .env file feature only works when you use the docker-compose up
echo "Run in Docker" $1 $2 $3 $4 $5
if [[ $1 == "prod" ]]; then
    # docker run -e HOST=$1 -e TIME=$2 -e XRPS=$3 -e DELAY=$4 --env-file .env.production.local lys-docker
    docker-compose run -e HOST=$1 -e TIME=$2 -e XRPS=$3 -e DELAY=$4 k6
else
    # docker run --network="lmru--k6--template_default" -e HOST=$1 -e TIME=$2 -e XRPS=$3 -e DELAY=$4 --env-file .env.test.local lys-docker
    # docker run -e HOST=$1 -e TIME=$2 -e XRPS=$3 -e DELAY=$4 --env-file .env.test.local lys-docker
    docker-compose run -e HOST=$1 -e TIME=$2 -e XRPS=$3 -e DELAY=$4 k6
fi

