require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoute');
const app = express();
app.use(express.json())

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