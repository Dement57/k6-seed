FROM golang:1.17.6-alpine
RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build v0.36.0 --with github.com/avitalique/xk6-file@latest
ENTRYPOINT ["sh", "-c","./tests/loadRunner.sh $HOST $TIME $XRPS $DELAY $INFLUXDB "]
