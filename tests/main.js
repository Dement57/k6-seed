export { default as getSomeInfo } from './specs/getSomeInfo.js'
let time;
let xRPS;
__ENV.time ? time = __ENV.time : time = '60m'
__ENV.xRPS ? xRPS = __ENV.xRPS : xRPS = 1

export let options = {
    insecureSkipTLSVerify: true,
    scenarios: {
        getByCustomerNumber: {
            executor: 'constant-arrival-rate',
            exec: "getByCustomerNumber",
            rate: Math.ceil(71 * xRPS),
            duration: time,
            preAllocatedVUs: Math.ceil(150 * xRPS),
            maxVUs: 600
        }
    }
}