FROM docker.art.lmru.tech/golang:1.18.3-alpine3.16 AS builder

RUN go install go.k6.io/xk6/cmd/xk6@latest && \
    xk6 build v0.40.0 --with github.com/avitalique/xk6-file@latest

FROM docker.art.lmru.tech/alpine:3.15

COPY --from=builder /go/k6 /usr/local/bin/

WORKDIR /opt/app

COPY ./tests ./tests

RUN cmod +x ./tests/loadRunner.sh  && \ 
    chown daemon:daemon -R /opt/app/

USER daemon

ENTRYPOINT ["sh", "-c","./tests/loadRunner.sh $HOST $TIME $XRPS $DELAY $INFLUXDB "]
