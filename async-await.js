import { urls, getUrl } from './utils';

async function fetchInSequence(urls) {
  for (const url of urls) {
    await getUrl(url);
  }
}

fetchInSequence(urls);
