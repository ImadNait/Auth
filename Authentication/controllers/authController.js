const User = require('../models/authModel');


const handleErrors = (err) =>{
    console.log(err.message, err.code)   
    let errors = { email:'', password:'' }; 


    if(err.code === 11000){
        errors.email='User email already exists!'
        return errors;
        
    }


    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path]=properties.message;
        });
    }

    return errors;k

}


module.exports.signup_get = (req, res)=>{
    res.render('signup');
}

module.exports.login_get = (req, res)=>{
    res.render('login');
}

module.exports.signup_post = async (req, res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.create({ email, password })
        res.status(201).json(user);
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }

}

module.exports.login_post = (req, res)=>{
    const { email, password } = req.body;
    console.log(email, password)
    res.send('new login');
}