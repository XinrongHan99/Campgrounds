// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const catchAsync = require('../utils/catchAsync');
// const User = require('../models/user');

// router.get('/register', (req, res) => {
//     res.render('users/register');
// });

// router.post('/register', catchAsync(async (req, res, next) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registeredUser = await User.register(user, password);
//         req.login(registeredUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Welcome to Yelp Camp!');
//             res.redirect('/campgrounds');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('register');
//     }
// }));

// router.get('/login', (req, res) => {
//     res.render('users/login');
// })

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
//     req.flash('success', 'welcome back!');
//     console.log('inside POST /login', req.session.returnTo);
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     res.redirect(redirectUrl);
//     delete req.session.returnTo;
// })

// router.get('/logout', (req, res, next) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         // if you're using express-flash
//         req.flash('success', "Goodbye!");
//         res.redirect('/campgrounds');
//     });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { keepSessionInfo: true, failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;