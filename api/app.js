const express=require('express')
const { default: mongoose } = require('mongoose')
const app=express()
const ApiRouter=require('./router/api')
mongoose.connect('mongodb://127.0.0.1:27017/SingLogin')
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const passport = require('passport')
const session = require('express-session');
require('dotenv').config();




// Express session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 3, // Three hours
        },
    })
);


// Initialize Passport
require('./config/passport-config')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',ApiRouter)
app.listen(5000,()=>{
    console.log("server is runing on 5000 port")
})