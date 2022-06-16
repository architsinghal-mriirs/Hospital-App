// Essential Imports
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000
const db = require('./models/index');

// Model Routes
const authRoutes = require('./routes/auth.routes');

// Express App
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes Registeration
authRoutes(app);

app.get('/',(req,res)=>{
    res.send("Home Page");
})

if(process.env.SYNC){
    db.sequelize.sync({force:true});
}

app.listen(port, ()=>{
    console.log("Server started on port, ", port);
})