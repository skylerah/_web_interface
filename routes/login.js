//jshint esversion: 6
const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res, next) {
  res.render('login/index', { message: req.flash('Oops, bad login, fucker.') } );
});

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/characters',
    failureRedirect: '/login',
    failureFlash: true
  }));

module.exports = router;
