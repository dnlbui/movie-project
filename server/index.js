const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');

// DB Setup
//keys. Will server up set dependent on environment
mongoose.createConnection(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);

//router will go top to bottom. Then route anything through the app. If URL matches then sends responses from controller methods.
//If it makes it to the if statement then it's probably looking for osmething in the client. Going to make these folders and files
//accesible to the server...bc in a moment it'll need a script and then if we don't get any routes then it'll be from the react router ones.
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // it'll show the html file and it'll route from there the script and link tags... Then goes back to the router(app)...
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);