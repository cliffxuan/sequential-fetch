import { urls, getUrl } from './utils';

/*
 * functional style by using Array.reduce
 */
urls
  .map(url => () => getUrl(url))
  .reduce((x, y) => x.then(y), Promise.resolve());
