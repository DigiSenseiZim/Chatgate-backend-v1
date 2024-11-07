// services/hitlSessionService.js
const hitlSessionRepository = require('../repositories/hitlSessionRepository');

class HitlSessionService {
    async listHitlSessions() {
        return hitlSessionRepository.getAllHitlSessions();
    }

    async listHitlSessionsByStatus(status) {
        return hitlSessionRepository.getAllHitlSessionsByStatus(status);
    }

    async getHitlSession(session_id) {
        return hitlSessionRepository.getHitlSessionById(session_id);
    }

    // async addHitlSession(hitlSessionData) {
    //     return hitlSessionRepository.createHitlSession(hitlSessionData);
    // }

    // async updateHitlSession(id, hitlSessionData) {
    //     return hitlSessionRepository.updateHitlSession(id, hitlSessionData);
    // }

    // async deleteHitlSession(id) {
    //     return hitlSessionRepository.deleteHitlSession(id);
    // }
}

module.exports = new HitlSessionService();
