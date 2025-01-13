const express = require('express');
const app = express();
const PORT = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/public'));
app.use('/css', express.static("dist"));


// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// TEMPLATEA
app.get('/template/:template', function(req, res) {
    res.render('pages/template', {template: req.params.template});
});

app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);