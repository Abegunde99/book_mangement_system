const app = require('../app');
const request = require('supertest');

describe('Book API', () => { 
    it('should create a new book', async () => {
        const res = await request(app)
            .post('/api/v1/books')
            .send({
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                year: 1954,
                isbn: '0618640150'
            });
        expect(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
    });

    it('should get all books', async () => { 
        const res = await request(app)
            .get('/api/v1/books');
        expect(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
    });

    it('should get a book', async () => { 
        const res = await request(app)
            .get('/api/v1/books/0618640150');
        expect(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
    });

    it('should update a book', async () => { 
        const res = await request(app)
            .put('/api/v1/books/1')
            .send({
                title: 'The Lord of the ring'
            });
        expect(200);
        expect(res.body.success).toBe(true);
    });

    it('should delete a book', async () => { 
        const res = await request(app)
            .delete('/api/v1/books/1');
        expect(200);
        expect(res.body.success).toBe(true);
    });

    it('should search for a book', async () => { 
        const res = await request(app)
            .get('/api/v1/books/search?author=J.R.R. Tolkien');
        expect(200);
    });
});