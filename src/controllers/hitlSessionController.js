// controllers/hitlSessionController.js
const hitlSessionService = require('../services/hitlSessionService');

class HitlSessionController {
    async getHitlSessions(req, res) {
        const hitlSessions = await hitlSessionService.listHitlSessions();
        res.json(hitlSessions);
    }
    
    async getHitlSessionsByStatus(req, res) {
        const hitl_sessions = await hitlSessionService.listHitlSessionsByStatus(req.query.status);
        res.json(hitl_sessions);
    }
 
    async getHitlSession(req, res) {
        const hitlSession = await hitlSessionService.getHitlSession(req.params.session_id);
        if (!hitlSession) return res.status(404).send('HitlSession not found');
        res.json(hitlSession);
    }

    // async createHitlSession(req, res) {
    //     const newHitlSession = await hitlSessionService.addHitlSession(req.body);
    //     res.status(201).json(newHitlSession);
    // }

    // async updateHitlSession(req, res) {
    //     const updatedHitlSession = await hitlSessionService.updateHitlSession(req.params.id, req.body);
    //     if (!updatedHitlSession) return res.status(404).send('HitlSession not found');
    //     res.json(updatedHitlSession);
    // }

    // async deleteHitlSession(req, res) {
    //     const result = await hitlSessionService.deleteHitlSession(req.params.id);
    //     if (result === 0) return res.status(404).send('HitlSession not found');
    //     res.status(204).send();
    // }
}

module.exports = new HitlSessionController();
