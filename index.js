import fs from 'fs';
import http from 'http';

function get(path, cb) {
  http.get(`http://localhost:3000/${path}`, response => {
    let body = '';
    if (response.status != 200) {
      cb('http error');
      return;
    }
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      const result = JSON.parse(body);
      cb(undefined, result);
    });
  });
}

get('userxxx', (err, user) => {
  if (err) {
    console.log(err);
    return;
  }

  fs.readFile(`${user.name}.json`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const details = JSON.parse(data);
    get(`reports/${user.name}?secret=${details.secret}`, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(result);
    });
  });
});
