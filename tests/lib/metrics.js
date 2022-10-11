import { Counter, Trend } from 'k6/metrics';
import { handleError } from './handleError.js';

const metricsObj = {
    successSearchByClientOnlyActiveTrue: new Counter('successSearchByClientOnlyActiveTrue'),
    failureSearchByClientOnlyActiveTrue: new Counter('failureSearchByClientOnlyActiveTrue'),
    searchBy100EmailsDuration: new Trend('searchBy100EmailsDuration', true),
}
const errors400th = new Counter('errors400th');
const errors500th = new Counter('errors500th');
const code100th = new Counter('code100th');
const code300th = new Counter('code300th');
const otherError = new Counter('otherError');
const errorsArr = [errors400th, errors500th, code100th, code300th, otherError]

export function successFailureMetrics(request, name) {
    const metricNameStartsWithCapital = name.charAt(0).toUpperCase() + name.slice(1)
    if (request.status == 200) {
        metricsObj["success" + metricNameStartsWithCapital].add(1);
    } else {
        handleError(request, errorsArr)
        metricsObj["failure" + metricNameStartsWithCapital].add(1);
    }
}

export function addMetrics(requestName, request, ...metrics) {
    // const trendMetrics = [metricsObj.searchBy100EmailsDuration, metricsObj.searchBy100EmailsAnd100PhonesDuration, metricsObj.searchBy100UnknownContactsDuration, metricsObj.searchByClientNumberAndContactAnd2EmailsAnd2PhonesOnlyActiveFalseDuration, metricsObj.searchByClientNumberAndContactAnd2EmailsAnd2PhonesOnlyActiveTrueDuration, metricsObj.searchByClientOnlyActiveFalseDuration, metricsObj.searchByClientOnlyActiveTrueDuration, metricsObj.searchByOneContactDuration, metricsObj.searchByOneUnknownContactDuration]
    // console.log('IN METRICS', JSON.stringify(request.timings.duration), requestName + "Duration")
    metrics.forEach(elem => {
        if (elem.includes('duration')) {
            metricsObj[requestName + "Duration"].add(request.timings.duration)
        } else if (elem.includes('connecting')) {
            metricsObj[requestName + "Connecting"].add(request.timings.connecting)
        } else if (elem.includes('tlshandshaking')) {
            metricsObj[requestName + "Tlshandshaking"].add(request.timings.tls_handshaking)
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