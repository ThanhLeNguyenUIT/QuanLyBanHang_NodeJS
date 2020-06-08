const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../resource/js/validation');

let messages = '';
router.get('/', function(req, res) {
    res.render('authentication',{mess: messages});
})
router.get('/authentication', function(req, res) {
    res.render('authentication',{mess: messages});
})
//router
router.post('/register', async (req,res) => {
    // validate
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
          // check user if exist
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return res.status(400).send('Email has already exist')
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        try{
            const savedUser = await user.save();
            res.render('/');
        }
        catch(err){
            res.status(400).send(err);
        }
})

    router.post('/dashboard', async (req, res) => {
    // validate the data
    const { error } = loginValidation(req.body);
    if(error) {
        messages = error.details[0].message;
        console.log(messages);
        return res.render('authentication', {mess: messages})
    }
    //check if email is exist
    const user = await User.findOne({email: req.body.email});
    if(!user){
        messages = "Email không tồn tại";
        console.log(messages);
        return res.render('authentication', {mess: messages})
    }
    // check the password if email is exist
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        messages = "Sai mật khẩu";
        console.log(messages);
        return res.render('authentication', {mess: messages})
    }
    console.log(user.name);
    messages= '';
    res.render('dashboard', {username: user.name});
})

// router.post('/authentication',
//     passport.authenticate('local', {
//         successRedirect: 'dashboard',
//         failureRedirect: 'authentication',
//         failureFlash: true
//     })
// );

// passport.use(new LocalStrategy({
//         usernameField: 'name_login',
//         passwordField: 'password'
//     },

//     function(username, password, done) {
//         User.findOne({ name_login: username }, function(err, username) {
//             if (err) throw err;
//             if (username) {
//                 bcrypt.compare(password, username.password, function(err, user) {
//                     if (err) throw err;
//                     if (user) {
//                         return done(null, username);
//                     } else {
//                         return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//                     }
//                 });
//             } else {
//                 return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//             }
//         });
//     }

// ));

// passport.serializeUser(function(email, done) {
//     done(null, name_login.id);
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, name_login) {
//         done(err, name_login);
//     });
// });

// router.post('/getUser', checkAdmin, function(req, res) {
//     res.json(req.user);
// });

// router.get('/dangxuat', checkAdmin, function(req, res) {
//     req.logout();
//     res.redirect('authentication');
// });

// function checkAdmin(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.redirect('authentication');
//     }
// }

exports.messages = messages;
module.exports = router;