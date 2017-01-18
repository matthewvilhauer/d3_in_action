// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express'),
    app = express(),
    appPort = process.env.PORT || 3000;

// serve static files from key folders
app.use('/scripts', express.static('scripts'));
app.use('/data', express.static('data'));
app.use('/styles', express.static('styles'));

/**********
 * ROUTES *
 **********/
app.get('/d3ia', function homepage (req, res) {
  res.sendFile(__dirname + '/d3ia.html');
});

app.get('/d3ia2', function homepage (req, res) {
  res.sendFile(__dirname + '/d3ia2.html');
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(appPort, function () {
  console.log('Express server is running on http://localhost:3000/');
});