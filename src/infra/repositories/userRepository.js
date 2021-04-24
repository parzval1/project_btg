var jwt = require('jsonwebtoken');

class UserRepository {
    constructor() {
        this.array_user = new Array();
    }

    async create(values) {
        var token = jwt.sign({ name: values.name, password: values.password }, 'secretkey', { expiresIn: '30m' });
        this.array_user[token] = values.name;
 
        return token;
    }

    async find(token) {
        if (!!this.array_user[token]) {
            return jwt.decode(token);
        } else {
            return null;
        }

    }
}

module.exports = new UserRepository();
