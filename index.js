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

async function report() {
  try {  
    const user = await getPromise('user');
    const details = await readPromise(`${user.name}.json`);
    const result = await getPromise(`reports/${user.name}?secret=${details.secret}`);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

report();
