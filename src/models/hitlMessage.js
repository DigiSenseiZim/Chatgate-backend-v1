// models/Agent.js
const { Model } = require('objection');

class HitlMessage extends Model {
    static get tableName() {
        return 'hitl_messages';
    }

}

module.exports = HitlMessage;