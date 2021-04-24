const authUserCommand = require('src/app/commands/userCommands/authUserCommand');
const findUserCommand = require('src/app/commands/userCommands/findUserCommand');
const handleErrors = require('src/utils/handleErrors');
const { BadRequest } = require('src/utils/errors');
const { dateValidation, cpfValidation } = require('src/utils/validations');

const authUser = (async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            throw new BadRequest('Parâmetros incompletos: nome ou senha.');
        }

        var result = await authUserCommand({ name, password });
        if (!!result) {
            res.status(201).send('Usuário inserido com sucesso. Para gerar o documento, utilize no header da chamada user/document o seguinte x-token: ' + result);
        }
    } catch (err) {
        const error = handleErrors(err);
        res.status(parseInt(error['status'])).send(error['message']);
    }

});

const userDocument = (async (req, res) => {
    try {
        const token = req.headers['x-token'];
        const name = req.query.name;
        const date = req.query.date;
        const cpf = req.query.cpf;
        const rg = req.query.rg;
        const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress
        const fs = require('fs');

        if (!token) {
            throw new BadRequest('Parâmetros incompletos: token de autenticação.');
        }

        if (!dateValidation(date) || !cpfValidation(cpf) || !name || !rg) {
            throw new BadRequest('Parâmetros incompletos: data, cpf, nome ou rg.');
        }

        var user_token = await findUserCommand(token);
        if (!!user_token) {
            if (Date.now() >= user_token['exp'] * 1000) {
                throw new BadRequest('O seu token de autenticação expirou, Por favor, efetue a atuenticação novamente.');
            }

            var noblank_user_token_name = user_token['name'].split(" ").join("")

            if (!fs.existsSync(`src/infra/files/${noblank_user_token_name}`)) {
                fs.mkdirSync(`src/infra/files/${noblank_user_token_name}`);
            }

            var stream = fs.createWriteStream(`src/infra/files/${noblank_user_token_name}` + '/info.txt');
            stream.once('open', function (fd) {
                stream.write("Nome Completo: " + name + "\n");
                stream.write("Data de Nascimento: " + date + "\n");
                stream.write("CPF: " + cpf + "\n");
                stream.write("RPG: " + rg + "\n");
                stream.write("\n\n");
                stream.write("Usuário autenticado\n");
                stream.write("Login: " + user_token['name'] + ", " + user_token['password'] + " \n");
                stream.write("IP: " + ip + " \n");
                stream.end();
            });

            res.status(201).send('Arquivo gerado com sucesso!');
        } else {
            throw new BadRequest('Usuário não encontrado. Por favor, efetue a autenticação novamente.');
        }
    } catch (err) {
        const error = handleErrors(err);
        res.status(parseInt(error['status'])).send(error['message']);
    }
});

module.exports = { authUser, userDocument };
