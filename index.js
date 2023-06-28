var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { MongoClient } = require('mongodb');
let con = new MongoClient(
  'mongodb+srv://root:root@cluster0.dzjjnon.mongodb.net/'
);
const generateToken = require('./tocken');

var app = express();
app.use(cors());
app.use(express.json());

app.get('/check', (req, resp) => {
  resp.send('working fine');
});

app.post('/user', async (req, resp) => {
  try {
    let dbConnect = await con.connect();
    let db = await dbConnect.db('repo');
    let table = await db.collection('users');
    let findData = await table.find({ email: req.body.email }).toArray();
    if (findData.length) {
      resp.status(200).json({ message: 'User already Exist' });
    } else {
      let insertData = await table.insertOne(req.body);
      resp.status(200).json({ message: 'inserted', data: insertData });
    }
  } catch (error) {
    resp.status(400).json({ message: 'error', error });
  }
});

app.post('/login', async (req, resp) => {
  try {
    let dbConnect = await con.connect();
    let db = await dbConnect.db('repo');
    let table = await db.collection('users');
    findData = await table.find({ email: req.body.email }).toArray();
    if (findData.length) {
      if (findData[0].password === req.body.password) {
        let token = await generateToken(findData[0]._id, findData[0].email);
        console.log(token);
        resp.status(200).json({ message: 'Login Successful', token, findData });
      } else {
        resp.status(200).json({ message: 'Incorrect password' });
      }
    } else {
      resp.status(200).json({ message: 'Incorrect email' });
    }
  } catch (error) {
    resp.status(400).json({ message: 'error' });
  }
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
