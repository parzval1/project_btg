const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('cors')());

app.use('/user/auth', require('src/interfaces/http/routes/userRoutes'));
app.use('/user/document', require('src/interfaces/http/routes/userRoutes'));


app.all('*', async (req, res) => {
    res.status(404).send('Rota não encontrada.');
});

module.exports = app;
