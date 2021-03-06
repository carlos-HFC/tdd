const bcrypt = require('bcryptjs')

const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', () => {
   beforeEach(async () => {
      await truncate()
   })

   it('should encrypt user password', async () => {
      const user = await User.create({
         name: "Carlos",
         email: "carlos@email.com",
         password: "123456"
      })

      expect(await bcrypt.compare('123456', user.passwordHash)).toBe(true)
   })
})
