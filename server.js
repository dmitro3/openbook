var express = require("express")
var app = express()
var fs = require('fs');

var HTTP_PORT = 8000

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/matches", (req, res, next) => {
    var obj = JSON.parse(fs.readFileSync('odds.json', 'utf8'));
    res.json(obj)
});

app.use(function(req, res){
    res.status(404);
});