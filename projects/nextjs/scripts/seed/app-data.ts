import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

faker.seed(123)

const hashedPassword = bcrypt.hashSync('!Aa12345', 10)

export const appData = {
  tenants: [
    {
      userId: 1,
      name: 'tenant 1',
    },
  ],

  users: [
    {
      tenantId: 1,
      username: 'admin',
      password: hashedPassword,
      email: 'admin@admin.com',
      emailVerified: true,
      firstName: 'Admin',
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      imageUrl: faker.image.avatar(),
      // rolesId: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  ],

  oauthProviders: [
    {
      tenantId: 1,
      userId: 1,
      provider: 'google',
      providerId: '107070559357552649255',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  ],
}
