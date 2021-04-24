const { describe, it } = require('mocha');
const request = require('test/support/request');

describe('ENDPOINT :: GET user', () => {
    context('find user with failure, because the jwt will be expired', async () => {
        it('Find user', async () => {
            await request().get('/user/document')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBMZWl0ZSIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNjE5Mjg4MTU2LCJleHAiOjE2MTkyODk5NTZ9.Vjgp-xH4veHmPhKwJLVMs_dqCRAlPwxx2LdA3dLKR6Q')
            .expect(400);
        });
    });
});
