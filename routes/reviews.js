const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const reviewsCtrl = require('../controllers/reviews');

const ensureLoggedIn = require('../config/ensureLoggedIn');



router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;