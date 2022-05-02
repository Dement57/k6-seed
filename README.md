# k6-seed
K6 basic files for project Including InfluxDB and Grafana. 
### Local
To start in Docker using:

- docker-compose run k6 run //tests/main.js

To start locally use command:

- k6 run main.js

## Start InfluxDB and Grafana

docker-compose up grafana influxdb

## Start local K6 with output to InfluxDB

k6 run -o influxdb=http://localhost:8086/ main.js

## Run by loadRunner.sh file with parameters $1 $2 $3
### first parameter $1 defines host for requests. If it is not defined or value is not "prod" it will be test environment 
### second parameter $1 defines time - test duration, for example "1s, 1m, 1h". If it is not defined duration will be 1 hour
### third parameter $2 defines RPS multiplier - multiplies rps of each test. By default value is 1.
### fourth parameter $4 defines delay (in seconds) for create account case (createAccount.js), by default 0.7 (in seconds);
### fifth parameter $5 defines influxDB address;

### Run loadTests on "test environment", "during 1 hour", "rps for all tests multiply by 1 (i.e. 1x)", "delay for create account case";
sh loadRunner.sh test 1h 1 0.8

To start locally use command:
 - sh ./tests/loadRunner.sh 1m 1

Run throgh docker-compose using:
 - docker-compose run k6 run //tests/main.js

To start locally use command:
 - k6 run tests/main.js

#Visualization
## 1. Start InfluxDB and Grafana in Docker
docker-compose up grafana influxdb

## 2. Start local K6 with output to InfluxDB
./k6 run -o influxdb=http://localhost:8086/k6 main.js

## Start local K6 with output to InfluxDB
docker image build --tag lys-docker . 

## Run $1 = HOST $2 = TIME $2 = TIME $3 = XRPS $4 = DELAY $4 = debug
sh dockerLoadRunner.sh test 1m 1 0.6
## Run through Docker Compose file
### Builf
docker-compose build k6
### Run
sh dockerLoadRunner.sh test 2m 0.2 0.8 
При запуске докер контейнера должна быть указана та же сеть, что и у influxDB и Grafana