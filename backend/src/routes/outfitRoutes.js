const express = require('express');
const { suggestOutfit } = require('../controllers/outfitController');

const router = express.Router();

router.get('/', suggestOutfit);

module.exports = router;
