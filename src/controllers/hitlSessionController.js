// controllers/hitlSessionController.js
const hitlSessionService = require('../services/hitlSessionService');
const Joi = require('joi');

class HitlSessionController {

    // GET: List all HITL sessions
    async getHitlSessions(req, res) {
        try {
            const hitlSessions = await hitlSessionService.listHitlSessions();
            res.status(200).json(hitlSessions);
        } catch (error) {
            console.error('Error fetching HITL sessions:', error.message);
            res.status(500).json({ error: 'Failed to fetch HITL sessions' });
        }
    }

    // GET: Fetch HITL sessions by status
    async getHitlSessionsByStatus(req, res) {
        
        // Schema for validating the query parameters of getHitlSessionsByStatus
        const validateGetHitlSessionsByStatusQuery = (query) => {
            const schema = Joi.object({
                status: Joi.boolean().required(),
            });
            return schema.validate(query);
        }
        try {
            const { error } = validateGetHitlSessionsByStatusQuery(req.query);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { status } = req.query;
            const hitlSessions = await hitlSessionService.listHitlSessionsByStatus(status);

            if (!hitlSessions || hitlSessions.length === 0) {
                return res.status(404).json({ message: 'No HITL sessions found for the given status' });
            }

            res.status(200).json(hitlSessions);
        } catch (error) {
            console.error('Error fetching HITL sessions by status:', error.message);
            res.status(500).json({ error: 'Failed to fetch HITL sessions' });
        }
    }

    // GET: Fetch a single HITL session by session_id
    async getHitlSession(req, res) {
        try {
            const schema = Joi.object({
                session_id: Joi.number().required(),
            });

            const { error } = schema.validate(req.params);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { session_id } = req.params;
            const hitlSession = await hitlSessionService.getHitlSession(session_id);

            if (!hitlSession) {
                return res.status(404).json({ message: 'HitlSession not found' });
            }

            res.status(200).json(hitlSession);
        } catch (error) {
            console.error('Error fetching HITL session:', error.message);
            res.status(500).json({ error: 'Failed to fetch HITL session' });
        }
    }

    
}

module.exports = new HitlSessionController();
