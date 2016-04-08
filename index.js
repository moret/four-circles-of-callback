import fs from 'fs';
import http from 'http';

function getPromise(path) {
  return new Promise((fullfill, reject) => {
    http.get(`http://localhost:3000/${path}`, response => {
      let body = '';
      if (response.statusCode != 200) {
        reject(`http error: ${path}`);
        return;
      }
      response.on('data', chunk => {
        body += chunk;
      });
      response.on('end', () => {
        const result = JSON.parse(body);
        fullfill(result);
      });
    });
  });
}

function readPromise(file) {
  return new Promise((fullfill, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      fullfill(JSON.parse(data));
    });
  });
}

let user;
getPromise('user').then(apiUser => {
  user = apiUser;
  return readPromise(`${user.name}.json`);
}).then(details => {
  return getPromise(`reports/${user.name}?secret=${details.secret}`);
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});
