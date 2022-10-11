export function handleError(requestObj, errorArr) {
    if (requestObj.status >= 500) {
        console.error(`---LOGERROR---\nREQUEST: ${JSON.stringify(requestObj.request.method)} ${JSON.stringify(requestObj.request.url)}\nBODY: ${JSON.stringify(requestObj.request.body)}\nRESPONSE STATUS: ${JSON.stringify(requestObj.status_text)}\nRESPONSE BODY: ${JSON.stringify(requestObj.body)}\nDURATION TIME (REQ + RES): ${requestObj.timings.duration}\n\n`);
        errorArr[1].add(1)
    } else if (requestObj.status >= 400 && requestObj.status < 500) {
        console.error(`---LOGERROR---\nREQUEST: ${JSON.stringify(requestObj.request.method)} ${JSON.stringify(requestObj.request.url)}\nBODY: ${JSON.stringify(requestObj.request.body)}\nRESPONSE STATUS: ${JSON.stringify(requestObj.status_text)}\nRESPONSE BODY: ${JSON.stringify(requestObj.body)}\nDURATION TIME (REQ + RES): ${requestObj.timings.duration}\n\n`);
        errorArr[0].add(1)
    }
    else if (requestObj.status >= 100 && requestObj.status < 200) {
        console.error(`---LOGERROR---\nREQUEST: ${JSON.stringify(requestObj.request.method)} ${JSON.stringify(requestObj.request.url)}\nBODY: ${JSON.stringify(requestObj.request.body)}\nRESPONSE STATUS: ${JSON.stringify(requestObj.status_text)}\nRESPONSE BODY: ${JSON.stringify(requestObj.body)}\nDURATION TIME (REQ + RES): ${requestObj.timings.duration}\n\n`);
        [2].add(1)
    }
    else if (requestObj.status >= 300 && requestObj.status < 400) {
        console.error(`---LOGERROR---\nREQUEST: ${JSON.stringify(requestObj.request.method)} ${JSON.stringify(requestObj.request.url)}\nBODY: ${JSON.stringify(requestObj.request.body)}\nRESPONSE STATUS: ${JSON.stringify(requestObj.status_text)}\nRESPONSE BODY: ${JSON.stringify(requestObj.body)}\nDURATION TIME (REQ + RES): ${requestObj.timings.duration}\n\n`);
        code300th[3].add(1)
    } else {
        console.error(`---LOGERROR---\nREQUEST: ${JSON.stringify(requestObj.request.method)} ${JSON.stringify(requestObj.request.url)}\nBODY: ${JSON.stringify(requestObj.request.body)}\nRESPONSE STATUS: ${JSON.stringify(requestObj.status_text)}\nRESPONSE BODY: ${JSON.stringify(requestObj.body)}\nDURATION TIME (REQ + RES): ${requestObj.timings.duration}\n\n`);
        otherError[3].add(1)
    }
}