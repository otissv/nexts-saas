import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

faker.seed(1234)

const randomItem = (list: any[]) =>
  list[faker.number.int({ min: 0, max: list.length - 1 })]
const types = ['single', 'single', 'multiple']

const collectionCount = 3

const CmsCollectionDocument = [...Array(collectionCount)]
  .map((_, index) => {
    return faker.helpers.multiple(
      () => {
        return {
          collectionId: index + 1,
          data:
            types[index] === 'single'
              ? [
                  {
                    title: faker.lorem.word(),
                    service: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs(3),
                  },
                ]
              : faker.helpers.multiple(
                  () => ({
                    title: faker.lorem.word(),
                    service: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs(3),
                  }),
                  { count: 100 }
                ),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        }
      },
      { count: 1 }
    )
  })
  .flat()

export const tenantData = {
  addresses: [
    {
      companyId: 1,
      streetAddress: faker.location.streetAddress(),
      addressDetails: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      type: 'billing',
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  ],

  companies: [
    {
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
    },
  ],

  cmsCollection: [...Array(collectionCount)].map((_, index) => {
    const columns = Object.keys(CmsCollectionDocument[0].data[0]).map(
      (key) => ({
        displayName: key.toUpperCase(),
        fieldId: key,
        type: randomItem([
          'text',
          'multi-reference',
          'reference',
          'number',
          'rich-text',
          'rich-content',
        ]),
        validation: {
          required: randomItem([true, false]),
        },
      })
    )

    return {
      userId: 1,
      displayName: faker.lorem.word(),
      datasetId: faker.lorem.word(),
      type: types[index],
      columns,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }
  }),

  CmsCollectionDocument,

  // medias: faker.helpers.multiple(
  //   () => ({
  //     url: faker.image.url(),
  //     description: 'Cityscape at night',
  //     width: 500,
  //     height: 600,
  //     caption: 'Cityscape at night',
  //     category: 'City',
  //     type: 'image',
  //     createdAt: faker.date.past(),
  //     updatedAt: faker.date.recent(),
  //   }),
  //   { count }
  // ),
  // menus: [
  //   {
  //     createdAt: faker.date.past(),
  //     updatedAt: faker.date.recent(),
  //     items: [
  //       {
  //         label: 'Home',
  //         url: '/',
  //         icon: 'home',
  //       },
  //       {
  //         label: 'About',
  //         url: '/about',
  //         icon: 'info',
  //       },
  //       {
  //         label: 'Contact',
  //         url: '/contact',
  //         icon: 'phone',
  //       },
  //       {
  //         label: 'Services',
  //         url: '/services',
  //         icon: 'services',
  //       },
  //     ],
  //   },
  // ],
  // pages: faker.helpers.multiple(
  //   () => ({
  //     name: faker.lorem.word(),
  //     categories: [randomItem(['travel', 'home', 'technology'])],
  //     relatedTo: [
  //       faker.number.int({ min: 1, max: 20 }),
  //       faker.number.int({ min: 1, max: 20 }),
  //     ],
  //     type: randomItem(['page', 'post']),
  //     createdAt: faker.date.past(),
  //     updatedAt: faker.date.recent(),
  //   }),
  //   { count }
  // ),
  // pagesMedia: faker.helpers.multiple(
  //   () => ({
  //     pageId: faker.number.int({ min: 1, max: 20 }),
  //     mediaId: faker.number.int({ min: 1, max: 20 }),
  //   }),
  //   { count }
  // ),

  // pageSections: faker.helpers.multiple(
  //   () => ({
  //     content: faker.lorem.text(),
  //     pageId: faker.number.int({ min: 1, max: 20 }),
  //     images: [
  //       faker.number.int({ min: 1, max: 20 }),
  //       faker.number.int({ min: 1, max: 20 }),
  //       faker.number.int({ min: 1, max: 20 }),
  //     ],
  //     createdAt: faker.date.past(),
  //     updatedAt: faker.date.recent(),
  //   }),
  //   { count }
  // ),

  // pageSectionsMedia: faker.helpers.multiple(
  //   () => ({
  //     pageSectionId: faker.number.int({ min: 1, max: 20 }),
  //     mediaId: faker.number.int({ min: 1, max: 20 }),
  //   }),
  //   { count }
  // ),

  // seos: faker.helpers.multiple(
  //   () => ({
  //     pageId: faker.number.int({ min: 1, max: 20 }),
  //     title: faker.lorem.word(),
  //     description: faker.lorem.text(),
  //     author: faker.person.fullName(),
  //     keywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  //     createdAt: faker.date.past(),
  //     updatedAt: faker.date.recent(),
  //   }),
  //   { count }
  // ),
}
