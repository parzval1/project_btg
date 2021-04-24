const request = require('supertest');
const app = require('src/interfaces/http/server').start()
module.exports = () => request(app);
