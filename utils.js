import fetch from 'node-fetch';

const urls = [
  'https://httpbin.org/ip',

  'https://httpbin.org/status/200',
  'https://httpbin.org/status/400',
  'https://httpbin.org/status/500',
];


const getUrl = (url) => {
  console.log(`--- start fetching ${url}`);
  return fetch(url)
    .then(response => {
      console.log(`${response.status} ${response.statusText}`);
      console.log(`${Array.from(response.headers.entries()).join('\n')}`);
      return response.text();
    })
    .then(body => console.log(`\n${body}`))
    .then(() => console.log(`*** finish fetching ${url}\n\n\n`))
    .catch(err => console.error(`!!! finish fetching ${url} with error ${err}\n\n\n`));
}

export { urls, getUrl }
