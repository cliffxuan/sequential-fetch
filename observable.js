import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { urls, getUrl } from './utils';


from(urls)
  .pipe(concatMap(url => from(getUrl(url))))
  .subscribe();
