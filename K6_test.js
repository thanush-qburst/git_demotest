import http from 'k6/http';
import { sleep, group, check } from 'k6';
import { Counter } from 'k6/metrics';
import { Trend} from 'k6/metrics';
import exec from 'k6/execution';


//// SMOKE TESTING
//     vus: 10,          // 1 Virtual User
//     duration: '1m',  // Run the test loop for exactly 3 seconds
// };
// export default function () {
//     http.get('https://test.k6.io');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/contacts.php');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/news.php');
//     sleep(2);
// }

/*****************************************************/
//// LOAD, STRESS TESTING
// export const options = {
//     stages: [
//         { duration: '20s', target: 10 }, // Ramp up to 2 users over 5 seconds
//         { duration: '2m', target: 10 }, // Stay at 2 users for 10 seconds
//         { duration: '5s', target: 0 }, // Ramp down to 0 users over 5 seconds
//     ], 
// };
// export default function () {
//     http.get('https://test.k6.io');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/contacts.php');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/news.php');
//     sleep(2);
// }

/*****************************************************/
// // SPIKE TESTING
// export const options = {
//     stages: [
//         { duration: '10s', target: 100 }, // Ramp up to 2 users over 5 seconds
//         // { duration: '2m', target: 10 }, // Stay at 2 users for 10 seconds
//         { duration: '10s', target: 0 }, // Ramp down to 0 users over 5 seconds
//     ], 
// };

// export default function () {
//     http.get('https://test.k6.io');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/contacts.php');
//     sleep(2);
//     http.get('https://quickpizza.grafana.com/news.php');
//     sleep(2);

// }

/*****************************************************/
// // MAKING REQUESTS
//     export const options = {
//     vus: 1,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
// };
//     export default function () {
//     // http.get('https://test.k6.io');
//     // sleep(2);
//     // http.get('https://quickpizza.grafana.com/contacts.php');
//     // sleep(2);
//     const res = http.get('https://test.k6.io');
//     console.log(res.status);
//     sleep(2);
//     const res2 = http.post('https://quickpizza.grafana.com/contacts.php');
//     console.log(res2.status);
//     console.log(res2.status);
//     console.log(res2.headers);
//     console.log(res2.body);
    
// }
    

/*****************************************************/
// // VALIDATING RESPONSE
//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
// };
    // export default function () {
    // const res = http.get('https://quickpizza.grafana.com/contacts.php');
    // check(res, {
    //     'response status is 200': (r) => r.status === 200,
    //     'Resp body Text check': (r) => r.body.includes('support@k6.io')
    //     });    
    // sleep(2);
// }

/*****************************************************/
// SET THRESHOLD VALUE | p(95)<= 100ms , total iterations, http fail count, etc....

//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
//     thresholds: {
//         http_req_duration: ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_duration: ['max<=500'],
//         http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//         http_reqs: ['rate<=5'],
//         iteration_duration: ['avg>=200'],
//         iterations: ['count<=10'],
//         vus: ['value<=5'],
//     },

// };
//     export default function () {
//     const res = http.get('https://quickpizza.grafana.com/contacts.php');
//     check(res, {
//         'response status is 200': (r) => r.status === 200,
//         'Resp body Text check': (r) => r.body.includes('support@k6.io')
//     });    
//     sleep(2);
// }

/*****************************************************/
// // CUSTOM METRICS | Eg : TC_02_Newspage => Resp time (avg, min, max, p90, p95, p99)
// // NOTE : for each and every txn create a object and impliment in the test case and add the response time (res.timings.duration) to display in custom metrics.

// //// import { Trend } from 'k6/metrics';
//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
//     thresholds: {
//         http_req_duration: ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_duration: ['max<=500'],
//         http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//         http_reqs: ['rate<=5'],
//         iteration_duration: ['avg>=200'],
//         iterations: ['count<=10'],
//         vus: ['value<=5'],
//     },

// };

//     //create object for custom metric
//     let LandingPage = new Trend('Resp_time_TC_01_LandingPage');
//     let NewsPage = new Trend('Resp_time_TC_02_Newspage');
// //      {variable}           {respective variable name}
 
//     export default function () {
//     let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
//     LandingPage.add(res.timings.duration);
//     check(res, {
//         'response status is 200': (r) => r.status === 200,
//         'Resp body Text check': (r) => r.body.includes('Note that this is a shared testing environment')
//     });    
// sleep(1);
//         res = http.get('https://quickpizza.grafana.com/news.php');
//         NewsPage.add(res.timings.duration); // add the response time to the custom metric
// sleep(1);
// }

/*****************************************************/
// CUSTOM TAGS => Adding custom tags to the metrics for better filtering and analysis in Grafana dashboards. This allows you to categorize and analyze your test results based on specific criteria, such as environment, feature, or any other relevant attribute.

//// import { Trend } from 'k6/metrics';
//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
//     thresholds: {
//         http_req_duration: ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_duration: ['max<=500'],
//         'http_req_duration{my_custom_tag:LandingPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         'http_req_duration{my_custom_tag:NewsPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//         http_reqs: ['rate<=5'],
        
//     },

// };

//     //create object for custom metric
//     let LandingPage = new Trend('Resp_time_TC_01_LandingPage');
//     let NewsPage = new Trend('Resp_time_TC_02_Newspage');
// //      {variable}           {respective variable name}
 
//     export default function () {
//     let res = http.get('https://quickpizza.grafana.com/test.k6.io/', {
//         tags: { my_custom_tag: 'LandingPage' },
//     });
//     LandingPage.add(res.timings.duration);
//     check(res, {
//         'response status is 200': (r) => r.status === 200,
//         'Resp body Text check': (r) => r.body.includes('Note that this is a shared testing environment'),
//     });    
//     sleep(1);
//     res = http.get('https://quickpizza.grafana.com/news.php', {
//         tags: { my_custom_tag: 'NewsPage' },
//     });
//     NewsPage.add(res.timings.duration); // add the response time to the custom metric
//     check(res, {
//         'response status is 200': (r) => r.status === 200,
//         'Resp body Text check': (r) => r.body.includes('News'),
//     });
//     sleep(1);
// }

/*****************************************************/
//ORGANIZE REQ IN GROUP (import groups from K6)

//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
//     thresholds: {
//         http_req_duration: ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_duration: ['max<=500'],
//         'http_req_duration{my_custom_tag:LandingPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//             'http_req_duration{my_custom_tag:LandingPage_css}': ['p(95)<=500'], // 95% of requests must complete below 5s
//             'http_req_duration{my_custom_tag:LandingPage_favicon}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         'http_req_duration{my_custom_tag:NewsPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//         http_reqs: ['rate<=5'],
        
//     },

// };

//     //create object for custom metric
//     let LandingPage = new Trend('Resp_time_TC_01_LandingPage');
//     let NewsPage = new Trend('Resp_time_TC_02_Newspage');
//     let LandingPage_css = new Trend('Resp_time_TC_01_LandingPage_css');
//     let LandingPage_favicon = new Trend('Resp_time_TC_01_LandingPage_favicon');
// //      {variable}           {respective variable name}
 
//     export default function () {
//     group('01_LandingPage', function () {
//         let res = http.get('https://quickpizza.grafana.com/test.k6.io/', {
//             tags: { my_custom_tag: 'LandingPage' },
                
//         });
//         LandingPage.add(res.timings.duration);
//         check(res, {
//             'response status is 200': (r) => r.status === 200,
//             'Resp body Text check': (r) => r.body.includes('Note that this is a shared testing environment'),
//         });
        
//         let resCss = http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css', {
//             tags: { my_custom_tag: 'LandingPage_css' },
//         });
//         LandingPage_css.add(resCss.timings.duration);

//         let resFavicon = http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico', {
//             tags: { my_custom_tag: 'LandingPage_favicon' },
//         });
//         LandingPage_favicon.add(resFavicon.timings.duration);
    
// sleep(1);
// });

//     group('02_NewsPage', function () {
//         let res = http.get('https://quickpizza.grafana.com/news.php?', {
//             tags: { my_custom_tag: 'NewsPage' },
//         });
//         NewsPage.add(res.timings.duration);
//         check(res, {
//             'response status is 200': (r) => r.status === 200,
//             'Resp body Text check': (r) => r.body.includes('News'),
//         });
// sleep(1);
// });
// }

/*****************************************************/
// GROUP DURATION IN RESULT | This feature allows you to measure the duration of specific groups of requests within your test script. By grouping related requests together, you can analyze the performance of specific workflows or user journeys in your application. This is particularly useful for identifying bottlenecks and optimizing the performance of critical paths in your application.

//     export const options = {
//     vus: 2,          // 1 Virtual User
//     duration: '5s',  // Run the test loop for exactly 3 seconds
//     thresholds: {
//         http_req_duration: ['p(95)<=500'], // 95% of requests must complete below 5s
//         'group_duration{group:::01_LandingPage}': ['p(95)<=350'],
//                 'group_duration{group:::01_LandingPage::LandingPage_css}': ['p(95)<=350'],
//                 'group_duration{group:::01_LandingPage::LandingPage_favicon}': ['p(95)<=350'],
//         'group_duration{group:::02_NewsPage}': ['p(95)<=350'],
//         'http_req_duration{my_custom_tag:LandingPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//             'http_req_duration{my_custom_tag:LandingPage_css}': ['p(95)<=500'], // 95% of requests must complete below 5s
//             'http_req_duration{my_custom_tag:LandingPage_favicon}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         'http_req_duration{my_custom_tag:NewsPage}': ['p(95)<=500'], // 95% of requests must complete below 5s
//         http_req_failed: ['rate<0.02'], // http errors should be less than 2%
//         http_reqs: ['rate<=5'],        
//     },
// };

//     //create object for custom metric
//     let LandingPage = new Trend('Resp_time_TC_01_LandingPage');
//     let NewsPage = new Trend('Resp_time_TC_02_Newspage');
//     let LandingPage_css = new Trend('Resp_time_TC_01_LandingPage_css');
//     let LandingPage_favicon = new Trend('Resp_time_TC_01_LandingPage_favicon');
// //      {variable}           {respective variable name}
 
//     export default function () {
//     group('01_LandingPage', function () {
//         let res = http.get('https://quickpizza.grafana.com/test.k6.io/', {
//             tags: { my_custom_tag: 'LandingPage' },
                
//         });
//         LandingPage.add(res.timings.duration);
//         check(res, {
//             'response status is 200': (r) => r.status === 200,
//             'Resp body Text check': (r) => r.body.includes('Note that this is a shared testing environment'),
//         });
        
//         let resCss = http.get('https://quickpizza.grafana.com/test.k6.io/static/css/site.css', {
//             tags: { my_custom_tag: 'LandingPage_css' },
//         });
//         LandingPage_css.add(resCss.timings.duration);

//         let resFavicon = http.get('https://quickpizza.grafana.com/test.k6.io/static/favicon.ico', {
//             tags: { my_custom_tag: 'LandingPage_favicon' },
//         });
//         LandingPage_favicon.add(resFavicon.timings.duration);
    
// sleep(1);
// });

//     group('02_NewsPage', function () {
//         let res = http.get('https://quickpizza.grafana.com/news.php?', {
//             tags: { my_custom_tag: 'NewsPage' },
//         });
//         NewsPage.add(res.timings.duration);
//         check(res, {
//             'response status is 200': (r) => r.status === 200,
//             'Resp body Text check': (r) => r.body.includes('News'),
//         });
// sleep(1);
// });
// }

/*****************************************************/
// STAGRS OF K6 TEST SCRIPTING AND ITS HIRERCHI

// export const options = {
//     stages: [
//         { duration: '100', target: 1 }, // Ramp up to 10 users over 10 seconds
//         { duration: '200', target: 1 }, // Stay at 10 users for 20 seconds
//         ],
// };

//     console.log('01 Init & RUP Stage');

//     export default function (data) {
//     console.log('02 Test Execution Stage');
// } 

//     export function setup() {
//     console.log('03 Setup Stage');
//     const data = { key: 'value' };
//     return data;
// }

//     export function teardown() {
//     console.log('04 Teardown Stage');
// }

/*****************************************************/
// ABORT TEST SCRIPT EXECUTION | This feature allows you to programmatically abort the execution of a test script based on certain conditions or criteria. This can be useful in scenarios where you want to stop the test if certain thresholds are exceeded, if specific errors occur, or if certain conditions are met during the test execution. By aborting the test script, you can prevent unnecessary resource consumption and focus on analyzing the results of the test up to that point.

//import exec from 'k6/execution';

    export const options = {
    stages: [
        { duration: '1s', target: 1 }, // Ramp up to 10 users over 10 seconds
        { duration: '20s', target: 1 }, // Stay at 10 users for 20 seconds
        { duration: '1s', target: 0 }, // Ramp down to 0 users over 10 seconds
        ],
};

    // export function setup() {
    //     let res = http.get('https://quickpizza.grafana.com/news');
    //     if (res.status !== 200) {
    //         console.error('Setup failed: News page is not accessible. Aborting test.');
    //         return { abort: true }; // Return an object indicating the test should be aborted
    //     }
    //     console.log('Setup successful: News page is accessible.');
    //     return { abort: false }; // Return an object indicating the test can proceed
    // }

        export function setup() {
        let res = http.get('https://quickpizza.grafana.com/news.php');
        if (res.error) {
            exec.test.abort('Setup failed: News page is not accessible. Aborting test.');
        }
        console.log('Setup successful: News page is accessible.');
        console.log(res.status);
        // console.log(res.body);
    }

    export default function (data) {
        http.get('https://quickpizza.grafana.com/news.php');

        sleep(1);
    }

/*****************************************************/
// CORRELATION | This feature allows you to extract dynamic values from server responses and use them in subsequent requests. Correlation is essential for handling session IDs, tokens, or any other dynamic data that changes with each user session. By capturing and reusing these values, you can ensure that your test script accurately simulates real user interactions with the application.





/*****************************************************/
/*****************************************************/
/*****************************************************/
/*****************************************************/
/*****************************************************/
/*****************************************************/
/*****************************************************/