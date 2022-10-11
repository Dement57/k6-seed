export { default as someFunction } from './specs/someMethodFile.js'

let time;
let xRPS;
__ENV.time ? time = __ENV.time : time = '3m';
__ENV.xRPS ? xRPS = __ENV.xRPS : xRPS = 1;

export let options = {
    insecureSkipTLSVerify: true,
    scenarios: {
        someFunctionWarmUp: {
            executor: 'ramping-arrival-rate',
            exec: "someFunction",
            startRate: Math.ceil(1),
            preAllocatedVUs: Math.ceil(3 * xRPS),
            timeUnit: "1s",
            stages: [
                { target: Math.ceil(25 * xRPS), duration: '1m' },
                { target: Math.ceil(50 * xRPS), duration: '2m' },
                { target: Math.ceil(80 * xRPS), duration: '2m' }
            ]
        },

        someFunction: {
            executor: 'constant-arrival-rate',
            exec: "someFunction",
            rate: Math.ceil(80 * xRPS),
            duration: time,
            preAllocatedVUs: Math.ceil(30 * xRPS),
            maxVUs: 400,
            startTime: '5m'
        }
    }
}