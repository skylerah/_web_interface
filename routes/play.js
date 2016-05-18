//jshint esversion: 6

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('play/index');
});

module.exports = router;
