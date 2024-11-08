// repositories/msgConversationRepository.js
const msgMessage = require("../models/MsgMessage");

class MsgMessageRepository {
    

    async createMsgMessage(MsgMessageData) {
        return msgMessage.query().insert(MsgMessageData);
    }

  
}

module.exports = new MsgMessageRepository();