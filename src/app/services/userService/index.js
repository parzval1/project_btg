const UserRepository = require('src/infra/repositories/userRepository');

class UserService {
    constructor() {
        this.repository = UserRepository;
    }

    async saveUser(data) {
        return this.repository.create(data);
    }

    async findUser(token) {
        return this.repository.find(token);
    }
}

module.exports = UserService;
