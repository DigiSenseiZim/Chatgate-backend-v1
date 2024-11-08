// controllers/hitlMessageController.js
const hitlMessageService = require('../services/hitlMessagesService');
const Joi = require('joi');
const { getUuid, getFormattedTimestamp } = require('../utils/helperFunctions');
const msgMessageService = require('../services/msgMessageService');

class HitlMessageController {


    // GET: List all HITL messages
    async getHitlMessages(req, res) {
        try {
            const hitlMessages = await hitlMessageService.listHitlMessages();
            res.status(200).json(hitlMessages);
        } catch (error) {
            console.error('Error fetching HITL messages:', error.message);
            res.status(500).json({ error: 'Failed to fetch HITL messages' });
        }
    }

    // GET: Fetch HITL messages by session_id and optional type
    async getHitlMessageBySessionId(req, res) {

        // Schema for validating session_id and type query parameters
        const validateGetHitlMessagesQuery = (query) => {
            const schema = Joi.object({
                session_id: Joi.number().required(),
                type: Joi.string().optional(),
            });
            return schema.validate(query);
        }
        try {
            const { error } = validateGetHitlMessagesQuery(req.query);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { session_id, type } = req.query;
            const hitlMessages = await hitlMessageService.getHitlMessage(session_id, type);

            if (!hitlMessages || hitlMessages.length === 0) {
                return res.status(404).json({ message: 'No HITL messages found for the given session ID' });
            }

            res.status(200).json(hitlMessages);
        } catch (error) {
            console.error('Error fetching HITL messages by session ID:', error.message);
            res.status(500).json({ error: 'Failed to fetch HITL messages' });
        }
    }

    // POST: Create a new HITL message
    async createHitlMessage(req, res) {
        try {
            const conversationId = req.query.conversationId
            const { raw_message } = req.body

            const msgMessage = {
                "id": getUuid(),
                "conversationId": conversationId,
                "sentOn": getFormattedTimestamp(),
                "payload": raw_message
            }

            await msgMessageService.addMsgMessage(msgMessage);

            const messageSchema = Joi.object({
                session_id: Joi.number().required(),
                type: Joi.string().required(),
                source: Joi.string().valid("agent", "user", "bot").required(),
                text: Joi.string().required(),
                raw_message: Joi.object({
                    text: Joi.string().required(),
                    agent: Joi.boolean().required(),
                    preview: Joi.string().required()
                }).required(),
                direction: Joi.string().valid("in", "out").required(),
                ts: Joi.date().iso().required()
            });

            const { error } = messageSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const newHitlMessage = await hitlMessageService.addHitlMessage(req.body);
            res.status(201).json(newHitlMessage);
        } catch (error) {
            console.error('Error creating HITL message:', error.message);
            res.status(500).json({ error: 'Failed to create HITL message' });
        }
        //Add message in the msgMessages table
       
    }
}

module.exports = new HitlMessageController();
