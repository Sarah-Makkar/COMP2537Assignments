const express = require('express');
const session = require('express-session')
const app = express();
const mysql = require('mysql');
// socket
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require("fs");
const {
  JSDOM
} = require('jsdom');

//morgan
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

app.use(morgan(':referrer :url :user-agent', {
  stream: accessLogStream
}));


//database session
app.use(session({
  secret: 'extra text that no one will guess',
  name: 'wazaSessionID',
  resave: false,
  saveUninitialized: true
}));

// static path mappings
app.use('/js', express.static('assets/js'));
app.use('/css', express.static('assets/css'));
app.use('/images', express.static('assets/images'));
app.use('/html', express.static('assets/html'));


app.get('/', function (req, res) {
  let doc = fs.readFileSync('./assets/html/login.html', "utf8");

  // let's make a minor change to the page before sending it off ...
  let dom = new JSDOM(doc);
  let $ = require("jquery")(dom.window);

  initDB();

  //    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //    let d = new Date().toLocaleDateString("en-US", dateOptions);
  //    $("#footer").append('<div id="left"></div>');
  //    $("#footer").append("<p id='right'>Copyright ©2021, (YOUR NAME HERE), Inc. Updated: " + d + "</p>");


  res.set('Server', 'Wazubi Engine');
  res.set('X-Powered-By', 'Wazubi');
  res.send(dom.serialize());

});

// log in functions (mysql) -----

async function initDB() {

  const mysql = require('mysql2/promise');
  // Let's build the DB if it doesn't exist
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
  });


  const createDBAndTables = `CREATE DATABASE IF NOT EXISTS test;
      use test;
      DROP TABLE user;
      CREATE TABLE IF NOT EXISTS user (
      ID int NOT NULL AUTO_INCREMENT,
      userID varchar(30),
      password varchar(30),
      PRIMARY KEY (ID));`;

  // Used to wait for a promise to finish ... IOW we are avoiding asynchronous behavior
  // Why? See below!
  await connection.query(createDBAndTables);
  let results = await connection.query("SELECT COUNT(*) FROM user");
  let count = results[0][0]['COUNT(*)'];

  if (count < 1) {
    results = await connection.query("INSERT INTO user (userID, password) values ('user', 'password')");
    console.log("Added one user record. ID='user', password='password'");
  }
  connection.end();
}

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

// authenticate (log in)
app.post('/authenticate', function (req, res) {
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  let results = authenticate(req.body.userID, req.body.password,
    function (rows) {
      if (rows == null) {
        // not found
        res.send({
          status: "fail",
          msg: "User account not found."
        });
      } else {
        // authenticate the user, create a session
        req.session.loggedIn = true;
        req.session.userID = rows.userID;
        req.session.save(function (err) {
          // session saved
        })
        // this will only work with non-AJAX calls
        //res.redirect("/profile");
        // have to send a message to the browser and let front-end complete
        // the action
        res.send({
          status: "success",
          msg: "Logged in."
        });
      }
    });

});

function authenticate(userID, pwd, callback) {
  const mysql = require('mysql2');
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  });

  connection.query(
    "SELECT * FROM user WHERE userID = ? AND password = ?", [userID, pwd],
    function (error, results) {
      if (error) {
        throw error;
      }

      if (results.length > 0) {
        // email and password found
        return callback(results[0]);
      } else {
        // user not found
        return callback(null);
      }

    });
}

var userID;

app.get('/display-main', function (req, res) {
  // check for a session first!
  if (req.session.loggedIn) {
    userID = req.session.userID;
    let mainChat = fs.readFileSync('./assets/html/main.html', "utf8");
    let templateDOM = new JSDOM(mainChat);
    let $template = require("jquery")(templateDOM.window);

    res.set('Server', 'Wazubi Engine');
    res.set('X-Powered-By', 'Wazubi');
    res.send(templateDOM.serialize());

  } else {
    // not logged in - no session!
    res.redirect('/');
  }
});



app.get('/display-chat', function (req, res) {
  console.log("/display   ---  " + req.session.userID);
  
  let mainChat = fs.readFileSync('./assets/html/chat.html', "utf8");
  let templateDOM = new JSDOM(mainChat);
  let $template = require("jquery")(templateDOM.window);

  res.set('Server', 'Wazubi Engine');
  res.set('X-Powered-By', 'Wazubi');
  res.send(templateDOM.serialize());


});

// io.use(function (socket, next) {
//   sessionMiddleware(socket.request, socket.request.res, next);
// });

//socket
var userCount = 0;

io.on('connect', function (socket) {
  console.log("connected userID: " + userID);

  userCount++;
  // let str = userID;
  socket.userName = userID;
  io.emit('user_joined', {
    user: socket.userName,
    numOfUsers: userCount
  });
  console.log('Connected users:', userCount);


  // disconnect
  socket.on('disconnect', function (data) {
    userCount--;
    io.emit('user_left', {
      user: socket.userName,
      numOfUsers: userCount
    });

    console.log('Connected users:', userCount);
  });


  //chatting
  socket.on('chatting', function (data) {

    console.log('User', data.name, 'Message', data.message);

    // if you don't want to send to the sender
    //socket.broadcast.emit({user: data.name, text: data.message});

    if (socket.userName == "anonymous") {


      io.emit("chatting", {
        user: data.name,
        text: data.message,
        event: socket.userName + " is now known as " + data.name
      });
      socket.userName = data.name;

    } else {

      io.emit("chatting", {
        user: socket.userName,
        text: data.message
      });

    }


  });

});

// logout
app.get('/logout', function (req, res) {
  req.session.destroy(function (error) {
    if (error) {
      console.log(error);
    }
  });
  res.redirect("/");
});





// RUN SERVER
let port = 8000;
server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});