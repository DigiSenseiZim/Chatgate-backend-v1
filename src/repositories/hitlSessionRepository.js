// repositories/hitlSessionRepository.js
const HitlSession = require('../models/HitlSession');

class HitlSessionRepository {
  
    async getAllHitlSessions() {
        try {
            const sessions = await HitlSession.query();
            return sessions;
        } catch (error) {
            console.error('Error fetching all HITL sessions:', error.message);
            throw new Error('Failed to retrieve HITL sessions.');
        }
    }

    async getAllHitlSessionsByStatus(status) {

        try {
            const sessions = await HitlSession.query().where('paused', status);
            return sessions;
        } catch (error) {
            console.error(`Error fetching HITL sessions with status: ${status}`, error.message);
            throw new Error('Failed to retrieve HITL sessions by status.');
        }
    }

    async getHitlSessionById(sessionId) {


        try {
            const session = await HitlSession.query().findById(sessionId);
            return session;
        } catch (error) {
            console.error(`Error fetching HITL session with ID: ${sessionId}`, error.message);
            throw new Error('Failed to retrieve HITL session by ID.');
        }
    }
}

module.exports = new HitlSessionRepository();
