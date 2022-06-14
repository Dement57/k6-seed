#!/bin/sh

# first parameter $1 defines host for requests. If it is not defined or value is not "prod" it will be test environment 
# second parameter $1 defines time - test duration, for example "1s, 1m, 1h". If it is not defined duration will be 1 hour
# third parameter $2 defines RPS multiplier - multiplies rps of each test. By default value is 1.
# fourth parameter $4 defines delay (in seconds) for create account case (createAccount.js), by default 0.7 (in seconds);
# fifth parameter $5 defines influxDB address;

sh ./genToken/genToken.sh
GEN_TOKEN_FILE=./genToken/tokens.txt
  echo "VARS" $1 $2 $3 $4

if [[ $1 == "prod" ]]
then
    HOST="https://somehost.com"
else 
    HOST="https://somehost-dev.com"
fi

if [[ $2 ]]
then
  TIME=$2
fi

if [[ $3 ]]
then
  XRPS=$3
fi

if [[ $4 ]]
then
  DELAY=$4
else 
  DELAY=0.8
fi
if [[ $5 ]]
then
  INFLUXDB_ADDR=$5
fi
  

echo "Run on" $1 "environment | duration time is" $2 "| RPS is multiplied by" $3 "| Delay is" $4 "| Results will be written to InfluxDB on" $5
# ./k6 run -o influxdb=http://localhost:8086/k6 -e host=$HOST -e time=$TIME -e xRPS=$XRPS -e delay=$DELAY ./tests/main.js
# ./k6 run -e host=$HOST -e schema=$SCHEME -e time=$TIME -e xRPS=$RPS -o influxdb=$INFLUXDB_ADDR ./tests/main.js

##Run on host machine with output to InfluxDB docker container
# ./k6 run --out influxdb=http://localhost:8086/k6 -e host=$HOST -e time=$TIME -e xRPS=$XRPS -e delay=$DELAY ./tests/main.js

##For run without output using docker container for k6
./k6 run -e host=$HOST -e time=$TIME -e xRPS=$XRPS -e delay=$DELAY ./tests/main.js

rm $GEN_TOKEN_FILE
echo $GEN_TOKEN_FILE "was Deleted"
