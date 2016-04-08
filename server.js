import express from 'express';
const app = express();

app.get('/user', (req, res) => {
  res.send({name: 'johnny'});
});

app.get('/reports/johnny', (req, res) => {
  if (req.query.secret == '1234')
    res.send({done: true});
  else
    res.send({bad: 'secret'});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});