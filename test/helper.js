const fs = require('fs');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app.js');
const { newId } = require('../lib/common');
const { fixProductDates, fixDiscountDates, getRandom } = require('../lib/testhelper');
const { runIndexing } = require('../lib/indexing');

// Get test data to compare in tests
const rawTestData = fs.readFileSync('./bin/testdata.json', 'utf-8');
const jsonData = JSON.parse(rawTestData);

// Setup some global DB objects for comparison
const globals = {
    db: {},
    config: {},
    products: {},
    variants: {},
    discounts: {},
    customers: {},
    users: {},
    reviews: {},
    request: null,
    jsonData
};

const setup = (db) => {
    return Promise.all([
        db.cart.deleteMany({}, {}),
        db.users.deleteMany({}, {}),
        db.customers.deleteMany({}, {}),
        db.products.deleteMany({}, {}),
        db.variants.deleteMany({}, {}),
        db.discounts.deleteMany({}, {}),
        db.orders.deleteMany({}, {}),
        db.sessions.deleteMany({}, {}),
        db.reviews.deleteMany({}, {})
    ])
    .then(() => {
        return Promise.all([
            db.users.insertMany(addApiKey(jsonData.users)),
            db.customers.insertMany(jsonData.customers),
            db.products.insertMany(fixProductDates(jsonData.products)),
            db.discounts.insertMany(fixDiscountDates(jsonData.discounts))
        ]);
    })
    .catch((err) => {
        console.error('Error setting up test data', err);
    });
};

const runBefore = async () => {
    try {
    // Create a session
    globals.request = supertest.agent(app);
    await new Promise(resolve => {
        app.on('appStarted', async () => {
            try {
            // Set some stuff now we have the app started
            globals.config = app.config;
            globals.db = app.db;

            await setup(globals.db);

            // Get some data from DB to use in compares
            globals.products = await globals.db.products.find({}).toArray();
            globals.customers = await globals.db.customers.find({}).toArray();
            globals.discounts = await globals.db.discounts.find({}).toArray();
            globals.users = await globals.db.users.find({}).toArray();

            // Insert variants using product ID's
            for(const variant of jsonData.variants){
                variant.product = globals.products[getRandom(globals.products.length)]._id;
                await globals.db.variants.insertOne(variant);
            };
            globals.variants = await globals.db.variants.find({}).toArray();

            // Insert orders using product ID's
            for(const order of jsonData.orders){
                order.orderProducts.push({
                    productId: globals.products[0]._id,
                    title: globals.products[0].productTitle,
                    quantity: 1,
                    totalItemPrice: globals.products[0].productPrice,
                    variant: globals.variants[0]._id,
                    productImage: globals.products[0].productImage,
                    productComment: null
                });
                order.orderDate = new Date();
                await globals.db.orders.insertOne(order);
            };
            globals.orders = await globals.db.orders.find({}).toArray();

            // Fix reviews
            for(const review of jsonData.reviews){
                review.date = new Date();
                review.product = globals.products[0]._id;
                review.customer = globals.customers[0]._id;
                await globals.db.reviews.insertOne(review);
            };
            globals.reviews = await globals.db.reviews.find({}).toArray();

            // Get csrf token
            const csrf = await globals.request
            .get('/admin/csrf');
            globals.csrf = csrf.body.csrf;

            // Index everything
            // await runIndexing(app);

            resolve();

        } catch (error) {
            console.error('Error during app setup:', error);
            resolve(); // Make sure to resolve the promise even in case of an error
          }
        });
    });
}
catch (error) {
    console.error('Error during runBefore:', error);
}
};

const addApiKey = (users) => {
    let index = 0;
    users.forEach(() => {
        users[index].apiKey = newId();
        index++;
    });
    return users;
};

module.exports = {
    runBefore,
    setup,
    globals
};
