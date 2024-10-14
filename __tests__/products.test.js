const request = require('supertest');
const app = require('../app');

describe('GET /products', () => {
	it('should return all products', async () => {
		const res = await request(app).get('/products');
		expect(res.statusCode).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body.length).toBeGreaterThan(0);
	});
});

describe('GET /products/:id', () => {
	it('should return a product by ID', async () => {
		const res = await request(app).get('/products/1');
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('id', 1);
	});
	it('should return 404 if product not found', async () => {
		const res = await request(app).get('/products/999');
		expect(res.statusCode).toBe(404);
		expect(res.body).toHaveProperty('message', 'Product not found');
	});
});

describe('POST /products', () => {
	it('should add a new product', async () => {
		const newProduct = {
			name: 'PC',
			price: 1000,
			stock: 15
		};
		const res = await request(app).post('/products').send(newProduct);
		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body).toMatchObject(newProduct);
	});
});

describe('PUT /products/:id', () => {
	it('should return an existing product', async () => {
                const res = await request(app).put('/products/1').send({});
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('name', 'Laptop');
                expect(res.body).toHaveProperty('price', 1000);
                expect(res.body).toHaveProperty('stock', 5);
        });
	it('should update an existing product', async () => {
		const updatedProduct = {
			name: 'Update Laptop',
			price: 5000,
			stock: 100
		};
		const res = await request(app).put('/products/1').send(updatedProduct);
		expect(res.statusCode).toBe(200);
		expect(res.body).toMatchObject(updatedProduct);
	});
	it('should return 404 if product not found', async () => {
		const res = await request(app).put('/products/999');
		expect(res.statusCode).toBe(404);
		expect(res.body).toHaveProperty('message', 'Product not found');
	});
});

describe('DELETE /products/:id', () => {
	it('should delete a product', async () => {
		const res = await request(app).delete('/products/2');
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('message', 'Product deleted');
	});
	it('should return 404 if product not found', async () => {
		const res = await request(app).delete('/products/999');
		expect(res.statusCode).toBe(404);
		expect(res.body).toHaveProperty('message', 'Product not found');
	});
});
