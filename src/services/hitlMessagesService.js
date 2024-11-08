// services/msgConversationService.js
const hitlMessageRepository = require('../repositories/hitlMessagesRepository');

class HitlMessageService {
    async listHitlMessages() {
        return hitlMessageRepository.getAllHitlMessages();
    }

    async getHitlMessage(session_id, type) {
        return hitlMessageRepository.getHitlMessagesById(session_id, type);
    }

    async addHitlMessage(MsgUserData) {
        return hitlMessageRepository.createHitlMessage(MsgUserData);
    }


    async updateHitlMessage(id, MsgUserData) {
        return hitlMessageRepository.updateHitlMessage(id, MsgUserData);
    }

    async deleteHitlMessage(id) {
        return hitlMessageRepository.deleteHitlMessage(id);
    }
}

module.exports = new HitlMessageService();