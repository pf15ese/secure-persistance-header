const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const persistanceAllowed = require('./persistanceAllowed');
const logger = require('./logger');

app.use(bodyParser.json());
// Important: must be after bodyParser,
// otherwise req.body is not defined 
app.use(persistanceAllowed.persistanceAllowed());
app.use(logger.logger());

function login() {
	// would contain login logic in a real app
}

app.post('/login', function (req, res) {
  login();
  res.send("login success");
});

// just to check the logs
app.get('/logs', function (req, res) {
  res.sendFile(logger.LOG_FILE, { root: __dirname });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
