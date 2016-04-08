import fs from 'fs';
import http from 'http';
import rp from 'request-promise';
import Promise from 'bluebird';

Promise.promisifyAll(fs);

async function report() {
  try {  
    const user = JSON.parse(await rp(`http://localhost:3000/user`));
    const details = JSON.parse(await fs.readFileAsync(`${user.name}.json`));
    const result = JSON.parse(await rp(`http://localhost:3000/reports/${user.name}?secret=${details.secret}`));
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

report();
