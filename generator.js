import { urls, getUrl } from './utils';
// import co from 'co';

/*
 * this simple runner can be replaced by
 * more mature library such as co
 * */
const runner = (generator) => {
  const iterator = generator();
  const _inner = () => {
    const result = iterator.next();
    if (result.done) {
      return result.value;
    } 
    return Promise
      .resolve(result.value)
      .then(() => _inner());
    }
  return _inner();
}


function* fetchInSequence(urls) {
  for (const url of urls) {
    yield getUrl(url);
  }
}

// co(() => fetchInSequence(urls));
runner(() => fetchInSequence(urls));
