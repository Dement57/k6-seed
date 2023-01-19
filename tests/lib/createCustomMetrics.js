import file from 'k6/x/file';

/**
 * Require k6 build with xk6-file extension
 * To run this file you need to use ./k6 run createCustomMetrics.js command
 * the main.js file with the your scenarios is supposed to be in './tests' dir like as './lib' dir
 */
const nameOfScenarios = open("../main.js").match(/(?<=as )\w*/gm);
function customMetricsFn(nameOfMetrics) {
    let metricsStr = '\n';
    nameOfMetrics.forEach(elem => {
        metricsStr = metricsStr + elem + 'Success: ' + 'new Counter("' + elem + 'Success"),\n'
            + elem + 'Failure: ' + 'new Trend("' + elem + 'Failure"),\n'
            + elem + 'Duration: ' + 'new Trend("' + elem + 'Duration"),\n\n'
    });
    return metricsStr;
}
const customMetrics = customMetricsFn(nameOfScenarios)
const textOfMetrics = `\nconst metricsObj = { ${customMetrics} }`
file.appendString('./tests/lib/metrics.js', textOfMetrics)