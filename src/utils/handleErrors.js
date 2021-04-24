const { GeneralError } = require('src/utils/errors');

const handleErrors = (err) => {
    if (err instanceof GeneralError) {
        return ({
            status: '400',
            message: err.message
        });
    }

    return ({
        status: '500',
        message: 'Ocorreu um erro interno no sistema.'
    });
}


module.exports = handleErrors;