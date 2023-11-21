const express = require('express');

const handle = require('./handlers')
const app = express();
const port = 5001;

app.get('/',(req,res)=>res.send('hello world!'));

app.use(handle.notFound);

app.use(handle.errors);

app.listen(port,console.log('Server started on port ${port}'));