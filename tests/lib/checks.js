import { check } from 'k6';

export function check200AndLengthOfArray(request, name, hasElemInArray) {
    if (hasElemInArray) {
        check(request, {
            [name + " STATUS 200"]: () => request.status === 200,
            [name + " HAS ELEMENT IN RESPONSE"]: () => JSON.parse(request.body).length > 0

        })
    } else {
        check(request, {
            [name + " STATUS 200"]: () => request.status === 200,
            [name + " EMPTY ARRAY IN RESPONSE"]: () => JSON.parse(request.body).length === 0
        })
    }
}
