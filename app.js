const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '10gb'}));
app.use(bodyParser.urlencoded({limit: '10gb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./mongo');


require('./routes/auth')(app,Users,rndstring);
require('./routes/notice')(app, Message,rndstring);
require('./routes/game')(app, Game, rndstring);
let port = 6101;

app.listen(process.env.PORT || 8080, function(){
  console.log("Server Porting On %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;