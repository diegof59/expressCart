const test = require('supertest');

const {
  runBefore,
  globals
} = require('./helper');

describe("Pruebas borrar review", () => {

  beforeAll(async () => {
    await runBefore();
  });

  it('[Correcto] Borrar una review', async () => {
    const response = await globals.request
        .post('/admin/review/delete')
        .send({ reviewId: globals.reviews[0]._id })
        .set('apiKey', globals.users[0].apiKey);

    expect(response.statusCode).toBe(200);

    // Check the returned message
    expect(response.body.message).toBe('Successfully deleted review');
  });

  it('[Incorrecto] Borrar una review, la review a borrar no existe', async () => {
    const response = await globals.request
        .post('/admin/review/delete')
        .send({ reviewId: globals.reviews[0]._id + 'falla' })
        .set('apiKey', globals.users[0].apiKey);
    
    expect(response.statusCode).toBe(400);

    // Check the returned message
    expect(response.body.message).toBe('Failed to delete product review');
  });
  
  it('[Incorrecto] Borrar una review, llega al bloque catch', async () => {
    
    // Mock the mongodb deleteOne function
    globals.db.reviews.deleteOne = async () => {
      throw new Error('Failed to delete review. Catch block');
    };
    
    const response = await globals.request
        .post('/admin/review/delete')
        .send({ reviewId: globals.reviews[1]._id })
        .set('apiKey', globals.users[0].apiKey)
    
    expect(response.statusCode).toBe(400);

    // Check the returned message
    expect(response.body.message).toBe('Failed to delete review. Please try again');
  });
});
