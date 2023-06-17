var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const CLIENT_ID = 'cfec03bb8f9b3ff03b1a';
const CLIENT_SECRET = '57078a77aad3998fe88661891b947a8d2fa3af82';

var app = express();
app.use(cors());
app.use(express.json());

app.get('/getAccessToken', async function (req, resp) {
  console.log(req.query.code);
  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    req.query.code;
  await fetch('https://github.com/login/oauth/access_token' + params, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      resp.json(result);
    });
});

app.get('/getUserData', async function (req, resp) {
  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'), //Bearer access token
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      resp.json(data);
    });
});

app.get('/getRepos', async function (req, resp) {
  // Import request package
  const request = require('request');

  // Import cheerio package
  const cheerio = require('cheerio');

  // Github Trending Page URL
  const url = 'https://github.com/trending';

  // Get request to the URL
  request.get(url, (error, response, body) => {
    // If the response code is 200 and
    // there is no error
    if (!error && response.statusCode == 200) {
      // Load HTML string into cheerio
      const $ = cheerio.load(body);

      // Below are the CSS selectors to
      // fetch the data required
      let temp = $('.Box-row');
      // console.log(temp);
      let repos = $('.h3.lh-condensed a');
      // console.log(repos);
      let data = [];
      for (let i = 0; i < repos.length; i++) {
        let reponame = $(temp[i])
          .find('.h3.lh-condensed a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repolanguage = $(temp[i])
          .find(
            '.f6.color-fg-muted.mt-2 span span[itemprop="programmingLanguage"]'
          )
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repostars = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 .d-inline-block.float-sm-right')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repoforks = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        // Push the fetched data into an object
        data.push({
          Repository: reponame,
          Language: repolanguage,
          Date: repostars,
          StarsForks: repoforks,
        });
      }

      // Display the Object created using console.table
      // console.table(data);
      resp.status(200).json(data);
    } else {
      console.log('Unable to fetch data from github');
      resp.status(400).json({ message: 'error' });
    }
  });
});

app.get('/getWeeklyRepos', async function (req, resp) {
  // Import request package
  const request = require('request');

  // Import cheerio package
  const cheerio = require('cheerio');

  // Github Trending Page URL
  const url = 'https://github.com/trending?since=weekly';

  // Get request to the URL
  request.get(url, (error, response, body) => {
    // If the response code is 200 and
    // there is no error
    if (!error && response.statusCode == 200) {
      // Load HTML string into cheerio
      const $ = cheerio.load(body);

      // Below are the CSS selectors to
      // fetch the data required
      let temp = $('.Box-row');
      // console.log(temp);
      let repos = $('.h3.lh-condensed a');
      // console.log(repos);
      let data = [];
      for (let i = 0; i < repos.length; i++) {
        let reponame = $(temp[i])
          .find('.h3.lh-condensed a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repolanguage = $(temp[i])
          .find(
            '.f6.color-fg-muted.mt-2 span span[itemprop="programmingLanguage"]'
          )
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repostars = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 .d-inline-block.float-sm-right')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repoforks = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        // Push the fetched data into an object
        data.push({
          Repository: reponame,
          Language: repolanguage,
          Date: repostars,
          StarsForks: repoforks,
        });
      }

      // Display the Object created using console.table
      // console.table(data);
      resp.status(200).json(data);
    } else {
      console.log('Unable to fetch data from github');
      resp.status(400).json({ message: 'error' });
    }
  });
});

app.get('/getMonthlyRepos', async function (req, resp) {
  // Import request package
  const request = require('request');

  // Import cheerio package
  const cheerio = require('cheerio');

  // Github Trending Page URL
  const url = 'https://github.com/trending?since=monthly';

  // Get request to the URL
  request.get(url, (error, response, body) => {
    // If the response code is 200 and
    // there is no error
    if (!error && response.statusCode == 200) {
      // Load HTML string into cheerio
      const $ = cheerio.load(body);

      // Below are the CSS selectors to
      // fetch the data required
      let temp = $('.Box-row');
      // console.log(temp);
      let repos = $('.h3.lh-condensed a');
      // console.log(repos);
      let data = [];
      for (let i = 0; i < repos.length; i++) {
        let reponame = $(temp[i])
          .find('.h3.lh-condensed a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repolanguage = $(temp[i])
          .find(
            '.f6.color-fg-muted.mt-2 span span[itemprop="programmingLanguage"]'
          )
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repostars = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 .d-inline-block.float-sm-right')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        let repoforks = $(temp[i])
          .find('.f6.color-fg-muted.mt-2 a')
          .text()
          .replace(/[\n\r]+|[\s]{2, }/g, ' ')
          .trim();

        // Push the fetched data into an object
        data.push({
          Repository: reponame,
          Language: repolanguage,
          Date: repostars,
          StarsForks: repoforks,
        });
      }

      // Display the Object created using console.table
      // console.table(data);
      resp.status(200).json(data);
    } else {
      console.log('Unable to fetch data from github');
      resp.status(400).json({ message: 'error' });
    }
  });
});
app.listen(8000, () => {
  console.log('server is live');
});
