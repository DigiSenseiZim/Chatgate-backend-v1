const {Model} = require('objection')

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async assignRole(userId, role) {
    const validRoles = ['Developer', 'Administrator', 'Manager', 'Supervisor', 'Agent', 'Analyst'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role');
    }

    await User.query().findById(userId).patch({ role });
  }

  static async getUsersByRole(role) {
    return User.query().where('role', role);
  }
}

module.exports = User;
