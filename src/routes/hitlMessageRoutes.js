// routes/msgConversationRoutes.js
const express = require('express');
const router = express.Router();
const hitlMessageController = require('../controllers/hitlMessagesController');

router.get('/all', hitlMessageController.getHitlMessages);
router.get('/messages/session_id', hitlMessageController.getHitlMessageBySessionId);
router.post('/create', hitlMessageController.createHitlMessage);


module.exports = router;