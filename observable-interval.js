import { from, interval } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { urls, getUrl } from './utils';


interval(1000)  // 1 request per second
  .pipe(
    take(urls.length),
    map(i => urls[i]),
    mergeMap(url => from(getUrl(url)))
  )
  .subscribe();
