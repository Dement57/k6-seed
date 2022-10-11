# lmru--k6--template
k6 template for prefomance testing

## Installation 
https://k6.io/docs/getting-started/installation/

## tests/lib 
Directory contains useful methods
- checks.js - contains checks on 200 status code with automatically resolving name of requests
- handleError.js - define  status code and logging it in console
- metrics.js:
    - successFailureMetrics function adds success or failure point using Counter object
    - addMetrics function adds specific request timings

## To Run local
```sh
k6 run sample.js
```
## To run local in current directory
```sh
./k6 run sample.js
```
## To run using Docker local
```sh
1. docker-compose up grafana influxdb
2. docker-compose build k6
3. sh dockerLoadRunner.sh test 1m 1
```