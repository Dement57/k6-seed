import { check } from 'k6';

export function check200(request, name) {
    check(request, {
        [name + " - STATUS 200"]: () => request.status === 200,
    })
}

export function check404(request, name) {
    check(request, {
        [name + " - STATUS 404"]: () => request.status === 404,
    })
}
