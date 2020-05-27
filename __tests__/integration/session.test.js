/*
describe
CATEGORIA DOS TESTES

it
TESTE. PRIMEIRO PARÂMETRO É O QUE A FUNÇÃO TEM QUE FAZER, SEGUNDO PARÂMETRO É A FUNÇÃO

expect
A VARIÁVEL QUE É RETORNADA

toBe
O QUE DEVE SER RETORNADO NA VARIÁVEL

beforeAll
SERÁ EXECUTADO ANTES DE TUDO

beforeEach
SERÁ EXECUTADO ANTES DE CADA TESTE

afterEach
SERÁ EXECUTADO DEPOIS DE CADA TESTE

afterAll
SERÁ EXECUTADO DEPOIS DE TUDO

toHaveProperty
PROPRIEDADE ESPERADA DENTRO DO RETORNO
*/
const request = require('supertest')

const app = require('../../src/app')
const factory = require('../factories')
const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
   beforeEach(async () => {
      await truncate()
   })

   it('should authenticate with valid credentials', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .post('/sessions')
         .send({
            email: user.email,
            password: '123456'
         })

      expect(response.status).toBe(200)
   })

   it('should not authenticate with invalid credentials', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .post('/sessions')
         .send({
            email: user.email,
            password: '987654'
         })

      expect(response.status).toBe(401)
   })

   it('should return jwt token when authenticated', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .post('/sessions')
         .send({
            email: user.email,
            password: '123456'
         })

      expect(response.body).toHaveProperty("token")
   })

   it('should be able to access private routes when authenticated', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .get('/dashboard')
         .set('Authorization', `Bearer ${user.generateToken()}`)

      expect(response.status).toBe(200)
   })

   it('should not be able to access private routes without jwt token', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .get('/dashboard')

      expect(response.status).toBe(401)
   })

   it('should not be able to access private routes with invalid jwt token', async () => {
      const user = await factory.create('User', {
         password: "123456"
      })

      const response = await request(app)
         .get('/dashboard')
         .set('Authorization', `Bearer 123456`)

      expect(response.status).toBe(401)
   })
})
