import fs from 'fs';
import http from 'http';

http.get('http://localhost:3000/user', response => {
  let body = '';
  response.on('data', chunk => {
    body += chunk;
  });
  response.on('end', () => {
    const user = JSON.parse(body);
    fs.readFile(`${user.name}.json`, (err, data) => {
      const details = JSON.parse(data);
      http.get(`http://localhost:3000/reports/${user.name}?secret=${details.secret}`, response => {
        let body = '';
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', () => {
          const result = JSON.parse(body);
          console.log(result);
        });
      });
    });
  });
});
