import fs from 'fs';
import http from 'http';

function get(path, cb) {
  http.get(`http://localhost:3000/${path}`, response => {
    let body = '';
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      const result = JSON.parse(body);
      cb(result);
    });
  });
}

get('user', user => {
  fs.readFile(`${user.name}.json`, (err, data) => {
    const details = JSON.parse(data);
    get(`reports/${user.name}?secret=${details.secret}`, result => {
      console.log(result);
    });
  });
});
