# Sequential Fetch

Examples of fetching urls in sequential order using different mechanisms.

1. [promise (imperative style)](./promise-imperative.js)

```javascript
let promise = Promise.resolve();
urls.forEach(url => {
  promise = promise.then(() => getUrl(url));
})
```

2. [promise (functional style)](./promise-functional.js)

```javascript
urls
  .map(url => () => getUrl(url))
  .reduce((x, y) => x.then(y), Promise.resolve());
```

3. [generator](./generator.js)

```javascript
import co from 'co';

function* fetchInSequence(urls) {
  for (const url of urls) {
    yield getUrl(url);
  }
}

co(() => fetchInSequence(urls));
```

4. [async/await](./async-await.js)

```javascript
async function fetchInSequence(urls) {
  for (const url of urls) {
    await getUrl(url);
  }
}

fetchInSequence(urls);
```

5. [observable](./observable.js)

```javascript
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

from(urls)
  .pipe(concatMap(url => from(getUrl(url))))
  .subscribe();
```

6. [observable with steady pace](./observable-interval.js)

```javascript
import { from, interval } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

interval(1000)  // 1 request per second
  .pipe(
    take(urls.length),
    map(i => urls[i]),
    mergeMap(url => from(getUrl(url)))
  )
  .subscribe();
```

## try it out

### install dependencies

```bash
npm install
```

### run

```bash
> npx babel-node async-await.js
--- start fetching https://httpbin.org/ip
200 OK
access-control-allow-credentials,true
access-control-allow-origin,*
connection,close
content-length,31
content-type,application/json
date,Sat, 24 Nov 2018 23:24:04 GMT
server,gunicorn/19.9.0
via,1.1 vegur

{
  "origin": "86.190.85.97"
}

*** finish fetching https://httpbin.org/ip



--- start fetching https://httpbin.org/status/200
200 OK
access-control-allow-credentials,true
access-control-allow-origin,*
connection,close
content-length,0
content-type,text/html; charset=utf-8
date,Sat, 24 Nov 2018 23:24:04 GMT
server,gunicorn/19.9.0
via,1.1 vegur


*** finish fetching https://httpbin.org/status/200



--- start fetching https://httpbin.org/status/400
400 BAD REQUEST
access-control-allow-credentials,true
access-control-allow-origin,*
connection,close
content-length,0
content-type,text/html; charset=utf-8
date,Sat, 24 Nov 2018 23:24:05 GMT
server,gunicorn/19.9.0
via,1.1 vegur


*** finish fetching https://httpbin.org/status/400



--- start fetching https://httpbin.org/status/500
500 INTERNAL SERVER ERROR
access-control-allow-credentials,true
access-control-allow-origin,*
connection,close
content-length,0
content-type,text/html; charset=utf-8
date,Sat, 24 Nov 2018 23:24:05 GMT
server,gunicorn/19.9.0
via,1.1 vegur


*** finish fetching https://httpbin.org/status/500
```
