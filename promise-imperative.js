import { urls, getUrl } from './utils';

/*
 * imperative style by using a variable to track the resolved promise
 */
let promise = Promise.resolve();
urls.forEach(url => {
  promise = promise.then(() => getUrl(url));
})
