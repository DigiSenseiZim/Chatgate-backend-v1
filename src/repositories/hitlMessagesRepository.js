// repositories/hitlMessageRepository.js

const hitlMessage = require("../models/hitlMessage");

class HitlMessageRepository {
    
    // Fetch all HITL messages
    async getAllHitlMessages() {
        try {
            return await hitlMessage.query();
        } catch (error) {
            console.error("Error fetching all HITL messages:", error.message);
            throw new Error("Failed to retrieve HITL messages");
        }
    }

    // Fetch HITL messages by session ID and exclude specific type
    async getHitlMessagesById(session_id, type) {
        try {
            return await hitlMessage
                .query()
                .where('session_id', '=', session_id)
                .andWhere('type', '!=', type);
        } catch (error) {
            console.error("Error fetching HITL messages by session ID:", error.message);
            throw new Error("Failed to retrieve HITL messages by session ID");
        }
    }

    // Create a new HITL message
    async createHitlMessage(MsgConversationData) {
        try {
            return await hitlMessage.query().insert(MsgConversationData);
        } catch (error) {
            console.error("Error creating HITL message:", error.message);
            throw new Error("Failed to create HITL message");
        }
    }

    // Update an existing HITL message by ID
    async updateHitlMessage(id, MsgConversationData) {
        try {
            return await hitlMessage.query().findById(id).patch(MsgConversationData);
        } catch (error) {
            console.error("Error updating HITL message:", error.message);
            throw new Error("Failed to update HITL message");
        }
    }

    // Delete a HITL message by ID
    async deleteHitlMessage(id) {
        try {
            return await hitlMessage.query().deleteById(id);
        } catch (error) {
            console.error("Error deleting HITL message:", error.message);
            throw new Error("Failed to delete HITL message");
        }
    }
}

module.exports = new HitlMessageRepository();
