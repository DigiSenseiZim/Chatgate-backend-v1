// models/MsgClient.js
const { Model } = require('objection');

class HitlSession extends Model {
    static get tableName() {
        return 'hitl_sessions';
    }

}

module.exports = HitlSession;