// services/hitlMessageService.js
const hitlMessageRepository = require('../repositories/hitlMessagesRepository');

class HitlMessageService {
   
    async listHitlMessages() {
        try {
            const messages = await hitlMessageRepository.getAllHitlMessages();
            return messages;
        } catch (error) {
            console.error('Error fetching HITL messages:', error.message);
            throw new Error('Failed to retrieve HITL messages.');
        }
    }


    async getHitlMessage(session_id, type) {
    
        if (!session_id ) {
            throw new Error('Invalid session ID');
        }
        if (!type ) {
            throw new Error('Invalid message type');
        }

        try {
            const message = await hitlMessageRepository.getHitlMessagesById(session_id, type);
            return message;
        } catch (error) {
            console.error(`Error fetching message for session ID: ${session_id}, type: ${type}`, error.message);
            throw new Error('Failed to retrieve HITL message.');
        }
    }

     async addHitlMessage(msgUserData) {
      
        if (!msgUserData) {
            throw new Error('Message data must be a valid object.');
        }
       
        try {
            const newMessage = await hitlMessageRepository.createHitlMessage(msgUserData);
            return newMessage;
        } catch (error) {
            console.error('Error creating HITL message:', error.message);
            throw new Error('Failed to create HITL message.');
        }
    }

   
    async updateHitlMessage(id, msgUserData) {
    
        if (!id ) {
            throw new Error('Invalid message ID');
        }
       
        try {
            const updatedMessage = await hitlMessageRepository.updateHitlMessage(id, msgUserData);
            return updatedMessage;
        } catch (error) {
            console.error(`Error updating message with ID: ${id}`, error.message);
            throw new Error('Failed to update HITL message.');
        }
    }

   
    async deleteHitlMessage(id) {
  
        if (!id ) {
            throw new Error('Invalid message ID');
        }

        try {
            const result = await hitlMessageRepository.deleteHitlMessage(id);
            return result;
        } catch (error) {
            console.error(`Error deleting message with ID: ${id}`, error.message);
            throw new Error('Failed to delete HITL message.');
        }
    }
}

module.exports = new HitlMessageService();
