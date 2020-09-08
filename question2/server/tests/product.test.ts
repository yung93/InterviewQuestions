import request from 'supertest';
import app from '../index';

describe('GET /product', () => {
    it('responds with status code 200', (done) => {
        request(app)
            .get('/api/product')
            .expect(200, done);
    });
});

describe('POST /product/details', () => {
    it('responds with status code 200', (done) => {
        request(app)
            .post('/api/product/details')
            .send({ skus: ['SKU01', 'SKU02'] })
            .expect(200, done);
    });
});