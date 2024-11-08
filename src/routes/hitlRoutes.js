const express = require('express');
const router = express.Router();
const hitlSessionController = require('../controllers/hitlSessionController');

router.get('/all', hitlSessionController.getHitlSessions);
router.get('/status', hitlSessionController.getHitlSessionsByStatus);
router.get('/:session_id', hitlSessionController.getHitlSession);

module.exports = router;
