const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res, next) => {
  res.render('./registration/index');
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/'
}));

module.exports = router;
