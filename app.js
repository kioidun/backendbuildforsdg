const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const estimatorRoutes = require('./routes/estimatorController');
const helmet = require('helmet');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')


app.use(bodyParser.json())
app.use((req,res,next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
     next();
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (req.get("content-type") !== 'undefined') {
        if (req.get("content-type") == 'application/json') {
            res.setHeader('content-type', req.get("content-type"));
        } else if (req.get("content-type") == 'application/xml') {
            res.setHeader('content-type', req.get("content-type"));
        }
    }
    next();
});

const logs = fs.createWriteStream(path.join(__dirname,'access-log'),{flags:'a'})

app.use(helmet());
app.use(morgan('combined', {stream: logs} ))
app.use('/api/v1',estimatorRoutes)
app.get("/api/v1/on-covid-19/logs",function(req,res) {
    fs.readFile(path.join(__dirname,'access-log'),"utf8",function(err,html) {
        res.send(html);
    });
});
app.use('/api/v1//on-covid-19',express.static('/api/v1//on-covid-19'))



app.listen(process.env.PORT || 8081); 