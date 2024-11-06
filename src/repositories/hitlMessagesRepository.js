// repositories/msgConversationRepository.js
const hitlMessage = require("../models/hitlMessage");

class HitlMessageRepository {
    async getAllHitlMessages() {
        return hitlMessage.query();
    }

    async getHitlMessagesById(session_id) {
        return hitlMessage.query().where('session_id', '=', session_id);
    }

    async createHitlMessage(MsgConversationData) {
        return hitlMessage.query().insert(MsgConversationData);
    }

    async updateHitlMessage(id, MsgConversationData) {
        return hitlMessage.query().findById(id).patch(MsgConversationData);
    }

    async deleteHitlMessage(id) {
        return hitlMessage.query().deleteById(id);
    }
}

module.exports = new HitlMessageRepository();