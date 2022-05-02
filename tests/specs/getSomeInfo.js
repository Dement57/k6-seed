// import file from 'k6/x/file';
import http from "k6/http";
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';
import { cardGenerate } from '../cardGen/cardGeneration.js'
const successCreateAccount = new Counter('successCreateAccount');
const failureCreateAccount = new Counter('failureCreateAccount');
const createAccountRespTime = new Trend('createAccountRespTime', true);
// const filepath = './tests/data/cardNumbers1.txt';
const token = open('../../genToken/tokens.txt');
let delay = __ENV.delay;

function createAccount(token) {
    function createAccountHeadersFn(token) {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "x-adeo-bu-id": 9
        }
    }

    function createAccountBodyFn(incomingValue) {
        return {
            "key": "value",
            "someInc": `${incomingValue}`
        }
    }
    const clientNumber = Math.ceil(100000000 + Math.random() * 100000000);
    const createAccountHeaders = createAccountHeadersFn(token);
    const createAccountBody = createAccountBodyFn(cardNumber);
    // console.log('BODY', JSON.stringify(createAccountBody));
    console.log("---------CREATE ACCOUNT---------");
    const createAccount = http.post(`${__ENV.host}/any-path?client=${clientNumber}`, JSON.stringify(createAccountBody), { headers: createAccountHeaders });
    createAccountRespTime.add(createAccount.timings.duration);
    console.log("CREATE ACCOUNT | Method is " + createAccount.request.method + " | Status code is " + createAccount.status);
    check(createAccount, {
        "CREATE ACCOUNT - STATUS 200": (r) => r.status == 200,
        "CREATE ACCOUNT - CUSTOMER NUMBER MATCHES": (r) => JSON.parse(r.body).customer == clientNumber
    });
    if (createAccount.status == 200) {
        // file.appendString(filepath, `${JSON.parse(createAccount.body).supports[0].number},`);
        successCreateAccount.add(1)
    } else {
        failureCreateAccount.add(1)
    }
}
export default function () {
    /**
      * CREATE ACCOUNT
      */
    createAccount(card, token);


}