import { Counter, Trend } from 'k6/metrics';
import { handleError } from './handleError.js';
const errors400th = new Counter('errors400th');
const errors500th = new Counter('errors500th');
const code100th = new Counter('code100th');
const code300th = new Counter('code300th');
const otherError = new Counter('otherError');
const errorsArr = [errors400th, errors500th, code100th, code300th, otherError]


/**
 * To get you own metrcisObj automatically from main.js file use createCustomeMetrics.js file 
 * Or uncomment the below object and fill it manually 
 */

// const metricsObj = {
//     successSearchByClientOnlyActiveTrue: new Counter('successSearchByClientOnlyActiveTrue'),
//     failureSearchByClientOnlyActiveTrue: new Counter('failureSearchByClientOnlyActiveTrue'),
//     searchBy100EmailsDuration: new Trend('searchBy100EmailsDuration', true),
// }

export function successFailureMetrics(request, name) {
    if (request.status == 200) {
        metricsObj[name + "Success"].add(1);
    } else {
        handleError(request, errorsArr)
        metricsObj[name + "Failure"].add(1);
    }
}

export function addMetrics(request, requestName, metrics) {
    metrics.forEach(elem => {
        if (elem.includes('duration')) {
            metricsObj[requestName + "Duration"].add(request.timings.duration)
        } else if (elem.includes('connecting')) {
            metricsObj[requestName + "Connecting"].add(request.timings.connecting)
        } else if (elem.includes('tlshandshaking')) {
            metricsObj[requestName + "TlsHandshaking"].add(request.timings.tls_handshaking)
        }
        else if (elem.includes('sending')) {
            metricsObj[requestName + "Sending"].add(request.timings.sending)
        }
        else if (elem.includes('waiting')) {
            metricsObj[requestName + "Waiting"].add(request.timings.waiting)
        }
        else if (elem.includes('receiving')) {
            metricsObj[requestName + "Receiving"].add(request.timings.receiving)
        }
    })
}