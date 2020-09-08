import request from 'supertest';
import app from '../index';

let transactionID:string = '';

describe('POST /transaction/summary', () => {
    it('responds with status code 200', (done) => {
        request(app)
            .post('/api/transaction/summary')
            .send({ products: [ { SKU: 'SKU01', quantity: 1 }, { SKU: 'SKU02', quantity: 1 }] })
            .expect(200)
            .end((err, res) => {
                if (!err) {
                    transactionID = res.body.id;
                }
                done();
            });
    });
});

describe('GET /transaction', () => {
    it('responds with status code 200', (done) => {
        request(app)
            .get(`/api/transaction/${transactionID}`)
            .expect(200, done);
    });
});

describe('POST /transaction/checkout', () => {
    it('responds with status code 200', (done) => {
        request(app)
            .post(`/api/transaction/checkout/${transactionID}`)
            .expect(200, done);
    });
});