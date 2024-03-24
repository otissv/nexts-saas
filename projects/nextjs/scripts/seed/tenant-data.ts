import { cmsColumnTypes } from '../../features/cms/cms-column-types'
import { faker } from '@faker-js/faker'

faker.seed(1234)

const randomItem = (list: readonly any[]) =>
  list[faker.number.int({ min: 0, max: list.length - 1 })]
const types = ['single', 'single', 'multiple']

const collectionCount = 3

const cmsCollectionDocument = [...Array(collectionCount)]
  .map((_, index) => {
    return faker.helpers.multiple(
      () => {
        return {
          datasetId: `${index + 1}`,
          data:
            // fieldId
            types[index] === 'single'
              ? [
                  {
                    address: {
                      streetAddress: faker.location.streetAddress(),
                      secondaryAddress: faker.location.secondaryAddress(),
                      city: faker.location.city(),
                      state: faker.location.state(),
                      country: faker.location.country(),
                      zipCode: faker.location.zipCode(),
                    },
                    // audio: [faker.internet.url()],
                    // audioFiles: [faker.internet.url(), faker.internet.url()],
                    boolean: faker.datatype.boolean(),
                    date: [faker.date.past()],
                    // dateRange: [faker.date.past(), faker.date.recent()],
                    // document: [faker.internet.url()],
                    // documents: [faker.internet.url(), faker.internet.url()],
                    // gallery: [faker.internet.url(), faker.internet.url()],
                    // image: [faker.internet.url()],
                    // multiReference: [1, 2, 3],
                    number: faker.number.int(),
                    privateText: faker.lorem.word(),
                    privateNumber: faker.number.int(),
                    // reference: [1],
                    richContent: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: faker.lorem.paragraphs(3),
                          },
                        ],
                      },
                    ],
                    richtext: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: faker.lorem.sentence(),
                          },
                        ],
                      },
                    ],

                    select: {
                      items: [
                        { id: 'apples', value: 'Apples' },
                        { id: 'pears', value: 'Pears' },
                        { id: 'oranges', value: 'Oranges' },
                        { id: 'bananas', value: 'Bananas' },
                      ],
                    },
                    tags: [{ id: 'apples', value: 'Apples' }],
                    tagSelect: {
                      items: [
                        { id: 'apples', value: 'Apples' },
                        { id: 'pears', value: 'Pears' },
                        { id: 'oranges', value: 'Oranges' },
                        { id: 'bananas', value: 'Bananas' },
                      ],
                    },
                    time: '12:00',
                    title: faker.lorem.word(),
                    text: faker.lorem.word(),
                    url: [faker.internet.url()],
                    video: [faker.internet.url()],
                    videos: [faker.internet.url()],
                  },
                ]
              : faker.helpers.multiple(
                  () => ({
                    address: {
                      streetAddress: faker.location.streetAddress(),
                      secondaryAddress: faker.location.secondaryAddress(),
                      city: faker.location.city(),
                      state: faker.location.state(),
                      country: faker.location.country(),
                      zipCode: faker.location.zipCode(),
                    },
                    audio: [],

                    // audioFiles: [faker.internet.url(), faker.internet.url()],
                    boolean: faker.datatype.boolean(),
                    date: [faker.date.past()],
                    // dateRange: [faker.date.past(), faker.date.recent()],
                    // document: [faker.internet.url()],
                    // documents: [faker.internet.url(), faker.internet.url()],
                    // gallery: [faker.internet.url(), faker.internet.url()],
                    image: [faker.internet.url()],
                    // multiReference: [1, 2, 3],
                    number: faker.number.int(),
                    privateText: faker.lorem.word(),
                    privateNumber: faker.number.int(),
                    // reference: [1],
                    richContent: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: faker.lorem.paragraphs(3),
                          },
                        ],
                      },
                    ],
                    richtext: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: faker.lorem.sentence(),
                          },
                        ],
                      },
                    ],
                    // tags: [
                    //   { id: 1, value: 'tags1' },
                    //   { id: 2, value: 'tags2' },
                    //   { id: 3, value: 'tags3' },
                    // ],
                    time: ['12:00'],
                    title: faker.lorem.word(),
                    text: faker.lorem.word(),
                    url: [faker.internet.url()],
                    video: [faker.internet.url()],
                    videos: [faker.internet.url()],
                  }),
                  { count: 100 }
                ),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          createdBy: 1,
          updatedBy: 1,
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
      createdBy: 1,
      updatedBy: 1,
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
      createdBy: 1,
      updatedBy: 1,
    },
  ],

  cmsCollection: [...Array(collectionCount)].map((_, index) => {
    return faker.helpers.multiple(
      () => ({
        userId: 1,
        collectionName: faker.lorem.word(),
        datasetId: `${index + 1}`,
        type: types[index],
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        createdBy: 1,
        updatedBy: 1,
      }),
      { count: 1 }
    )[0]
  }),

  cmsCollectionColumn: [...Array(collectionCount)].reduce((acc, _, index) => {
    return [
      ...acc,
      ...cmsColumnTypes.map((key) => ({
        userId: 1,
        datasetId: `${index + 1}`,
        columnName: key.toUpperCase(),
        fieldId: key,
        type: key,
        validation: {
          required: randomItem([true, false]),
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        createdBy: 1,
        updatedBy: 1,
      })),
      // ...Object.keys(cmsCollectionDocument[0].data[0]).map((key) => {
      //   return {
      //     userId: 1,
      //     datasetId: `${index + 1}`,
      //     columnName: key.toUpperCase(),
      //     fieldId: key,
      //     type: key,
      //     validation: {
      //       required: randomItem([true, false]),
      //     },
      //     createdAt: faker.date.past(),
      //     updatedAt: faker.date.recent(),
      //     createdBy: 1,
      //     updatedBy: 1,
      //   }
      // }),
    ]
  }, []),

  cmsCollectionDocument,

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
