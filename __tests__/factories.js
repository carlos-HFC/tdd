const faker = require('faker')
const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

/* 
faker
CRIARÁ PROPRIEDADES ALEATÓRIAS

faker.name.findName()
NOME E SOBRENOME

faker.internet.email()
E-MAIL

faker.internet.password()
SENHA ALFANUMÉRICA
*/

factory.define('User', User, {
   name: faker.name.findName(),
   email: faker.internet.email(),
   password: faker.internet.password()
})

module.exports = factory