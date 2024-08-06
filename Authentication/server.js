require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoute');
const app = express();
// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));



app.set('view engine', 'ejs');

const dbURL = 'mongodb+srv://ImadNait:imad552006@cluster0.ytma4tl.mongodb.net/NFC/users';
mongoose.connect(dbURL, { dbName:"NFC" })
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,(req, res)=>{
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((err)=>console.log(err));



app.get('/',(req, res)=>res.render ('home'))
app.get('/list',(req, res)=>res.render('list'))
app.use(authRoutes);


//cookies
app.get('/set-cookies',(req, res)=>{

    res.cookie('newUser', true)
    res.cookie('isCustomer', true, { maxAge: 1000*60*60*24, httpOnly:true })

    res.send('u got cookies!')

})

app.get('/read-cookies',(req, res)=>{
    const cookies = req.cookies;
    console.log(cookies.newUser)

    res.json(cookies);


})
