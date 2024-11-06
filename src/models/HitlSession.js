// models/MsgClient.js
const { Model } = require('objection');

class HitlSession extends Model {
    static get tableName() {
        return 'hitl_sessions';
    }

    static get relationMappings() {

    }
}

module.exports = HitlSession;