var express = require('express');
var router = express.Router();
var User = require('../model/user');


var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', checkAdmin, function(req, res) {
    res.render('authentication');
})

router.get('/authentication', checkAdmin, function(req, res) {
    res.render('authentication');
})
router.post('/authentication',
    passport.authenticate('local', {
        successRedirect: 'dashboard',
        failureRedirect: 'authentication',
        failureFlash: true
    })
);

passport.use(new LocalStrategy({
        usernameField: 'name_login',
        passwordField: 'password'
    },

    function(username, password, done) {
        User.findOne({ name_login: username }, function(err, username) {
            if (err) throw err;
            if (username) {
                bcrypt.compare(password, username.password, function(err, user) {
                    if (err) throw err;
                    if (user) {
                        return done(null, username);
                    } else {
                        return done(null, false, { message: 'Tài Khoảng Không Đúng' });
                    }
                });
            } else {
                return done(null, false, { message: 'Tài Khoảng Không Đúng' });
            }
        });
    }

));

passport.serializeUser(function(email, done) {
    done(null, name_login.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, name_login) {
        done(err, name_login);
    });
});

router.post('/getUser', checkAdmin, function(req, res) {
    res.json(req.user);
});

router.get('/dangxuat', checkAdmin, function(req, res) {
    req.logout();
    res.redirect('authentication');
});

function checkAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('authentication');
    }
}
module.exports = router;