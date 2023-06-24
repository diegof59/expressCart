const test = require('supertest');

const {
  runBefore,
  globals
} = require('./helper');

describe("Pruebas filtrar producto", () => {

  beforeAll(async () => {
    await runBefore();
  });

  it('[Correcto] Filtrar un producto y renderizar', async () => {
    let searchTerm = 'jacket';
    const response = await globals.request
        .get(`/admin/products/filter/jacket`) //${searchTerm}`)
        .set('apiKey', globals.users[0].apiKey)
        .expect('Content-Type', /json/)

        .expect(200)

        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              productTitle: "Duckworth Woolfill Jacket"
            }))});
/* 
    expect(response.statusCode).toBe(200);

    // Check the returned message
    expect(response.body.length).toBe(1) */
  });

  /* it('[Correcto] Filtrar un producto y retornar respuesta JSON', async () => {
    const response = await globals.request
        .post('/admin/review/delete')
        .send({ reviewId: globals.reviews[0]._id + 'falla' })
        .set('apiKey', globals.users[0].apiKey);
    
    expect(response.statusCode).toBe(400);

    // Check the returned message
    expect(response.body.message).toBe('Failed to delete product review');
  }); */
});
