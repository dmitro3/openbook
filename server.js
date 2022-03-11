var express = require("express")
var app = express()
var fs = require('fs');
var sqlite3 = require('sqlite3')

const DBSOURCE = "db.sqlite"

app.use(express.json())
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
    }else{
        console.log('Connected to the SQLite database.')

        db.run(`CREATE TABLE IF NOT EXISTS liquidity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address text, 
            amount integer
            )`);  

        db.run(`CREATE TABLE IF NOT EXISTS betslip (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            match_id text, 
            address text,
            outcome text,
            odds text,
            amount text,
            to_win text,
            status text DEFAULT pending
            )`);  

    }
});

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

app.get("/bets/:address", (req, res, next) => {
    var sql = "select * from betslip where address = ?"
    var params = [req.params.address]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(row)
      });
});

app.post("/bets/create/", (req, res, next) => {
    var errors=[]
    var data = {
        match_id: req.body.match_id,
        address: req.body.address,
        outcome: req.body.outcome,
        amount: req.body.amount,
        to_win: parseFloat(req.body.amount) * parseFloat(req.body.odds),
        odds: req.body.odds
    }
    var sql ='INSERT INTO betslip (match_id, address, outcome, odds, amount, to_win) VALUES (?,?,?,?,?,?)'
    var params =[data.match_id, data.address, data.outcome, data.odds, data.amount, data.to_win]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


app.post("/liquidity/add/", (req, res, next) => {
    var errors=[]

    var data = {
        address: req.body.address,
        amount: req.body.amount,
    }
    var sql ='INSERT INTO liquidity (address, amount) VALUES (?,?)'
    var params =[data.address, data.amount]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


app.get("/liquidity/allowed/:id", (req, res, next) => {
    db.get("select SUM(amount) AS allowedLiquidity from liquidity", (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        db.get("select SUM(to_win) AS usedLiquidity from betslip WHERE status='pending'", (err1, row1) => {
            if (err1) {
                res.status(400).json({"error":err.message});
                return res.json(parseFloat(row['allowedLiquidity']))
            }


            if (row1['usedLiquidity'] == null)
                return res.json(row['allowedLiquidity'] * 0.2)                                
            else    
                return res.json((parseFloat(row['allowedLiquidity']) - parseFloat(row1['usedLiquidity'])) * 0.2)

        });
      });

});


app.use(function(req, res){
    res.status(404);
});
