require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // test POST recipe
  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  // test GET a single recipe
  it('gets a specific recipe', async() => {
    const recipe = await Recipe.create(
      { name: 'cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ],
      });
    return request(app)
      .get(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: recipe.name,
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  // test GET all recipes
  it('gets all recipes', async() => {
    const recipes = await Recipe.create([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        });
      });
  });

  // test PATCH single recipe
  it('updates a recipe by id', async() => {
    const recipe = await Recipe.create({
      name: 'cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    });

    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  // test DELETE single recipe
  it('deletes a recipe by id', async() => {
    const recipe = await Recipe.create([
      { name: 'cookies', directions: [] },
    ]);

    return request(app)
      .delete('/api/v1/recipe/${recipe._id}')
      .then(res => {
        recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        };
      });
  });
});