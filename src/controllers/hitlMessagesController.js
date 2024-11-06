// controllers/msgConversationController.js
const hitlMessageService = require('../services/hitlMessagesService');

class hitlMessageController {
    async getHitlMessages(req, res) {
        const hitlMessages = await hitlMessageService.listhitlMessages();
        res.json(hitlMessages);
    }

    async getHitlMessageBySessionId(req, res) {
        const hitlMessage = await hitlMessageService.gethitlMessage(req.query.session_id);

        res.json(hitlMessage);
    }

    async createHitlMessage(req, res) {
        const newHitlMessage = await hitlMessageService.addHitlMessage(req.body);
        res.status(201).json(newHitlMessage);
    }

    // async updateHitlMessage(req, res) {
    //     const updatedHitlMessage = await hitlMessageService.updateHitlMessage(req.params.id, req.body);
    //     if (!updatedHitlMessage) return res.status(404).send('msgConversation not found');
    //     res.json(updatedHitlMessage);
    // }

    // async deleteHitlMessage(req, res) {
    //     const result = await hitlMessageService.deleteHitlMessage(req.params.id);
    //     if (result === 0) return res.status(404).send('msgConversation not found');
    //     res.status(204).send();
    // }
}

module.exports = new hitlMessageController();