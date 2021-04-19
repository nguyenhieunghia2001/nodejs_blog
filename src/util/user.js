const User = require('../app/models/user');

module.exports = {
    findByEmail: (email) => {
        User.findOne({email: email})
            .then (u => u)
            .catch ({})
    }
}