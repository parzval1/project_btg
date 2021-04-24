const UserService = require('src/app/services/userService');
module.exports = async (userToken) => {
    const result_user = await new UserService().findUser(userToken);
    return result_user;
};
