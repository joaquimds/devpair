const http = require('http');
const express = require('express');

const fixtures = require('./services/fixtures');

const app = express();

app.use(require('body-parser').json());
app.use(require('cookie-parser')());
app.use(require('./auth'));

app.use(require('./api/users'));
app.use(express.static('public'));

const server = http.createServer(app);

fixtures.ensure().then(() => {
    server.listen(3000, () => {
        console.log('Server listening on port')
    });
});


