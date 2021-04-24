const UserService = require('src/app/services/userService');
module.exports = async (userObject) => {
    var result_token = await new UserService().saveUser(userObject);
    return result_token;
};
