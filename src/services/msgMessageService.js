// services/msgConversationService.js
const msgMessageRepository = require('../repositories/msgMessagesRepository');

class MsgMessageService {
   

    async addMsgMessage(MsgMessageData) {
        return msgMessageRepository.createMsgMessage(MsgMessageData);
    }


    
}

module.exports = new MsgMessageService();