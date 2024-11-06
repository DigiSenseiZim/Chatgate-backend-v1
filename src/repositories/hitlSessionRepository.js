// repositories/hitl_sessionRepository.js
const hitl_session = require('../models/HitlSession');

class HitlSessionRepository {
    async getAllHitlSessions() {
        return hitl_session.query();
    }
    
    async getAllHitlSessionsByStatus(status) {
        return hitl_session.query().where('paused', '=', status);
    }

    async getHitlSessionById(session_id) {
        return hitl_session.query().findById(session_id);
    }

    // async createHitlSession(hitl_sessionData) {
    //     return hitl_session.query().insert(hitl_sessionData);
    // }

    // async updateHitlSession(id, hitl_sessionData) {
    //     return hitl_session.query().findById(id).patch(hitl_sessionData);
    // }

    // async deleteHitlSession(id) {
    //     return hitl_session.query().deleteById(id);
    // }
}

module.exports = new HitlSessionRepository();