import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

faker.seed(123)
const count = 100

const hashedPassword = bcrypt.hashSync('!Aa12345', 10)

export const data = {
  users: [
    {
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
    ...faker.helpers.multiple(
      () => ({
        username: faker.internet.userName(),
        password: hashedPassword,
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        imageUrl: faker.image.avatar(),
        // rolesId: faker.string.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }),
      { count: count - 1 }
    ),
  ],

  oauthProviders: faker.helpers.multiple(
    () => ({
      // 1.
      provider: 'google',
      providerId: '107070559357552649255',
      userId: 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  tenants: faker.helpers.multiple(
    () => ({
      // 1.
      ownerId: 1,
    }),
    { count }
  ),

  addresses: faker.helpers.multiple(
    () => ({
      userId: 1,
      streetAddress: faker.location.streetAddress(),
      addressDetails: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      type: 'billing',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  companies: faker.helpers.multiple(
    () => ({
      name: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      socialLinks: [
        {
          url: faker.internet.url(),
          label: 'Facebook',
          icon: 'https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png',
        },
      ],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  companyAddresses: faker.helpers.multiple(
    () => ({
      companyId: 1,
      site: faker.word.adjective(),
      streetAddress: faker.location.streetAddress(),
      addressDetails: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  contents: faker.helpers.multiple(
    () => ({
      sectionId: faker.number.int({ min: 1, max: 5 }),
      text: faker.lorem.text(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  medias: faker.helpers.multiple(
    () => ({
      url: faker.image.url(),
      description: 'Cityscape at night',
      width: 500,
      height: 600,
      caption: 'Cityscape at night',
      category: 'City',
      type: 'image',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),
  menus: [
    {
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      items: [
        {
          label: 'Home',
          url: '/',
          icon: 'home',
        },
        {
          label: 'About',
          url: '/about',
          icon: 'info',
        },
        {
          label: 'Contact',
          url: '/contact',
          icon: 'phone',
        },
        {
          label: 'Services',
          url: '/services',
          icon: 'services',
        },
      ],
    },
  ],
  pages: faker.helpers.multiple(
    () => ({
      name: faker.lorem.word(),
      heading1: faker.lorem.text(),
      heading2: faker.lorem.text(),
      isPublished: faker.datatype.boolean(),
      publishedDate: faker.date.past(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),
  pagesMedia: faker.helpers.multiple(
    () => ({
      pageId: faker.number.int({ min: 1, max: 20 }),
      mediaId: faker.number.int({ min: 1, max: 20 }),
    }),
    { count }
  ),

  sections: faker.helpers.multiple(
    () => ({
      heading1: faker.lorem.words(),
      heading2: faker.lorem.words(),
      images: [
        faker.number.int({ min: 1, max: 20 }),
        faker.number.int({ min: 1, max: 20 }),
        faker.number.int({ min: 1, max: 20 }),
      ],
      category: faker.lorem.word(),
      type: 'twoColumn',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),

  sectionsMedia: faker.helpers.multiple(
    () => ({
      sectionId: faker.number.int({ min: 1, max: 20 }),
      mediaId: faker.number.int({ min: 1, max: 20 }),
    }),
    { count }
  ),

  seos: faker.helpers.multiple(
    () => ({
      pageId: faker.number.int({ min: 1, max: 20 }),
      title: faker.lorem.word(),
      description: faker.lorem.text(),
      author: faker.person.fullName(),
      keywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }),
    { count }
  ),
}
