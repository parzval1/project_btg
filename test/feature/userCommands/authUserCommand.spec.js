const { describe, it } = require('mocha');
const request = require('test/support/request');

describe('ENDPOINT :: POST auth', () => {
    context('auth user with success', async () => {
        let payload;
        beforeEach(async () => {
            payload = {
                name: 'name',
                password: 'password',
            };
        });

        it('Auth user', async () => {
            await request().post('/user/auth').send(payload).expect(201);
        });
    });
});
