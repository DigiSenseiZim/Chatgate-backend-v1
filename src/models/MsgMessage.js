// models/MsgClient.js
const { Model } = require('objection');

class MsgMessage extends Model {
    static get tableName() {
        return 'msg_messages';
    }
}

module.exports = MsgMessage;