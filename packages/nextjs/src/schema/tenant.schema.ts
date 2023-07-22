import { boolean, index, integer, pgSchema } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import {
  links,
  menuItems,
  money,
  serial,
  text,
  timestampz,
  varchar,
  varcharArray,
} from 'database/pg/data-types.pg'

const PRICING_TYPE = ['one_time', 'recurring']
const PRICING_INTERVALS = ['month', 'year']
const SUBSCRIPTION_STATUS = [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused',
]
const ADDRESS_TYPE = ['billing', 'shipping']

const SCHEMA = 'tenant'
const schema = pgSchema(SCHEMA)

const address = {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  streetAddress: varchar('street_address', { length: 256 }).notNull(),
  addressDetails: varchar('address_details', { length: 256 }),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }),
  postalCode: varchar('postal_code', { length: 256 }).notNull(),
  country: varchar('country', { length: 256 }).notNull(),
  type: varchar('type', { enum: ADDRESS_TYPE } as any).notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

const company = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }),
  website: text('website'),
  socialLinks: links('social_links'),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

const companyAddress = {
  id: serial('id').primaryKey(),
  companyId: integer('company_id')
    .references(() => users.id)
    .notNull(),
  streetAddress: varchar('street_address', { length: 256 }).notNull(),
  addressDetails: varchar('address_details', { length: 256 }),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }),
  postalCode: varchar('postal_code', { length: 256 }).notNull(),
  country: varchar('country', { length: 256 }).notNull(),
  site: varchar('site', { length: 256 }),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const companyAddressOptions = (table: any) => {
  return {
    companyId: index('company_id_idx').on(table.companyId),
  }
}

const content = {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id')
    .references(() => sections.id)
    .notNull(),
  text: text('text').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const contentOptions = (table: any) => {
  return {
    userId: index('user_id_idx').on(table.userId),
  }
}
/**
 * CUSTOMERS
 * Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
 */
const customer = {
  id: serial('id')
    .references(() => users.id)
    .primaryKey(),
  stripeCustomerId: text('stripe_customer_id'),
}
const customerOptions = (table: any) => {
  return {
    stripeCustomerIdIndex: index('stripe_customer_id_idx').on(
      table.stripeCustomerId
    ),
  }
}

const media = {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  description: text('description').notNull(),
  width: integer('width'),
  height: integer('height'),
  caption: text('caption'),
  category: varchar('category', { length: 256 }),
  type: varchar('type', { length: 256 }).notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

const menu = {
  id: serial('id').primaryKey(),
  items: menuItems('items'),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

/**
 * Orders
 */
const order = {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  customerId: integer('customer_id')
    .references(() => users.id)
    .notNull(),
  status: varchar('status', { length: 256 }).notNull(),
  totalAmount: money('total_amount').notNull(),
  currency: varchar('currency', { length: 256 }).notNull(),
  paymentIntentId: varchar('payment_intent_id', { length: 256 }),
  shippingMethod: varchar('shipping_method', { length: 256 }),
  createdAt: timestampz('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const orderOptions = (table: any) => {
  return {
    userIdIndex: index('user_id_idx').on(table.userId),
    customerIdIndex: index('customer_id_idx').on(table.customerId),
  }
}

const page = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  heading1: text('heading1'),
  heading2: text('heading2'),

  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

/**
 * PAGES MEDIA
 * Note: this is a private table that contains a mapping of page IDs to media IDs.
 * This is used to allow users to add multiple media to a page.
 */
const pagesMedia = {
  id: serial('id').primaryKey(),
  pageId: integer('page_id')
    .references(() => pages.id)
    .notNull(),
  mediaId: integer('media_id')
    .references(() => medias.id)
    .notNull(),
}
const pagesMediaOptions = (table: any) => {
  return {
    pageIdIndex: index('page_id_idx').on(table.pageId),
    mediaIdIndex: index('media_id_idx').on(table.mediaId),
  }
}

/**
 * PAGES SECTION
 * Note: this is a private table that contains a mapping of page IDs to section IDs.
 * This is used to allow users to add multiple sections to a page.
 */
const pagesSection = {
  id: serial('id').primaryKey(),
  pageId: integer('page_id')
    .references(() => pages.id)
    .notNull(),
  sectionId: integer('section_id')
    .references(() => sections.id)
    .notNull(),
}
const pagesSectionOptions = (table: any) => {
  return {
    pageIdIndex: index('page_id_idx').on(table.pageId),
    sectionId: index('section_id_idx').on(table.sectionId),
  }
}

/**
 * PRICING PLANS
 * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const pricingPlan = {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').references(() => products.id),
  active: boolean('active').notNull().default(false),
  /** The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).*/
  unitAmount: money('unit_amount').notNull(),
  /* Three-letter ISO currency code, in lowercase. */
  currency: varchar('currency', { length: 3 }).notNull(),
  /* One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase. */
  type: varchar('type', { enum: PRICING_TYPE } as any).notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  interval: varchar('interval', { enum: PRICING_INTERVALS } as any).notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  intervalCount: integer('interval_count').notNull(),
  /* Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https:/*stripe.com/docs/api#create_subscription-trial_from_plan). */
  trialPeriodDays: integer('trial_period_days'),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const pricingPlanOptions = (table: any) => {
  return {
    productIdIndex: index('product_id_idx').on(table.productId),
  }
}

/**
 * PRODUCTS
 * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const product = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  price: varchar('price', { length: 256 }).notNull(),
  imageUrl: text('image_url'),
  slug: varchar('slug', { length: 256 }),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

const section = {
  id: serial('id').primaryKey(),
  heading1: text('heading1'),
  heading2: text('heading2'),
  category: varchar('category', { length: 256 }),
  type: varchar('type', { length: 256 }),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

/**
 * SECTION MEDIA
 * Note: this is a private table that contains a mapping of section IDs to media IDs.
 * This is used to allow users to add multiple media to a section.
 */
const sectionsMedia = {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id')
    .references(() => sections.id)
    .notNull(),
  mediaId: integer('media_id')
    .references(() => medias.id)
    .notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const sectionsMediaOptions = (table: any) => {
  return {
    sectionIdIndex: index('section_id_idx').on(table.sectionId),
    mediaIdIndex: index('media_id_idx').on(table.mediaId),
  }
}

const subscription = {
  /* Subscription ID from Stripe, e.g. sub_1234. */
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  /* ID of the price that created this subscription. */
  priceId: integer('price_id')
    .references(() => pricingPlans.id)
    .notNull(),
  /* The status of the subscription object, one of subscription_status type above. */
  status: varchar('status', { enum: SUBSCRIPTION_STATUS } as any).notNull(),
  /* if subscription has been set to automatically renew or not. */
  autoRenew: boolean('auto_renew').notNull().default(true),
  /* Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats. */
  quantity: integer('quantity').notNull(),
  /* If true the subscription has been canceled by the user and will be deleted at the end of the billing period. */
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  /* Start of the current period that the subscription has been invoiced for. */
  currentPeriodStart: timestampz('current_period_start')
    .notNull()
    .default(sql`now()`),
  /* End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created. */
  currentPeriodEnd: timestampz('current_period_end')
    .notNull()
    .default(sql`now()`),
  /* If the subscription has ended, the timestamp of the date the subscription ended. */
  endedAt: timestampz('ended_at')
    .notNull()
    .default(sql`now()`),
  /* A date in the future at which the subscription will automatically get canceled. */
  cancelAt: timestampz('cancel_at')
    .notNull()
    .default(sql`now()`),
  /* If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state. */
  canceledAt: timestampz('canceled_at')
    .notNull()
    .default(sql`now()`),
  /* If the subscription has a trial, the beginning of that trial. */
  trial_start: timestampz('trial_start')
    .notNull()
    .default(sql`now()`),
  /* If the subscription has a trial, the end of that trial. */
  trialEnd: timestampz('trial_end')
    .notNull()
    .default(sql`now()`),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const subscriptionOptions = (table: any) => {
  return {
    userIndex: index('user_id_idx').on(table.userId),
    priceIdIndex: index('price_id_idx').on(table.priceId),
  }
}

const seo = {
  id: serial('id').primaryKey(),
  pageId: integer('page_id')
    .references(() => pages.id)
    .notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  author: varchar('author', { length: 256 }),
  keywords: varcharArray('keywords', { length: 256 }),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}
const seoOptions = (table: any) => {
  return {
    seoIdIndex: index('seo_id_idx').on(table.seoId),
  }
}

const user = {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  imageUrl: text('image_url'),
  password: varchar('password', { length: 256 }),
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
}

export const addresses = schema.table('addresses', address)
export type TenantAddressSchema = typeof addresses

export const companies = schema.table('companies', company)
export type TenantCompanySchema = typeof companies

export const companyAddresses = schema.table(
  'company_addresses',
  companyAddress,
  companyAddressOptions
)
export type TenantCompanyAddressSchema = typeof companyAddresses

export const contents = schema.table('contents', content, contentOptions)
export type TenantContentSchema = typeof contents

export const customers = schema.table('customers', customer, customerOptions)
export type TenantCustomerSchema = typeof customers

export const medias = schema.table('media', media)
export type TenantMediaSchema = typeof medias

export const menus = schema.table('menus', menu)
export type TenantMenuSchema = typeof menu

export const orders = schema.table('orders', order, orderOptions)
export type TenantOrderSchema = typeof orders

export const pagesMedias = schema.table(
  'pageMedias',
  pagesMedia,
  pagesMediaOptions
)
export type TenantPageMediaSchema = typeof pagesMedias

export const pagesSections = schema.table(
  'pageSections',
  pagesSection,
  pagesSectionOptions
)
export type TenantPageSectionSchema = typeof pagesSection

export const pages = schema.table('pages', page)
export type TenantPageSchema = typeof pages

export const pricingPlans = schema.table(
  'pricing_plans',
  pricingPlan,
  pricingPlanOptions
)
export type TenantPricingPlanSchema = typeof pricingPlan

export const products = schema.table('products', product)
export type TenantProductSchema = typeof product

export const sections = schema.table('sections', section)
export type TenantSectionSchema = typeof section

export const sectionsMedias = schema.table(
  'sectionsMedias',
  sectionsMedia,
  sectionsMediaOptions
)
export type TenantSectionMediaSchema = typeof sectionsMedia

export const seos = schema.table('seos', seo, seoOptions)
export type TenantSeoSchema = typeof seos

export const subscriptions = schema.table(
  'subscriptions',
  subscription,
  subscriptionOptions
)
export type TenantSubscriptionsSchema = typeof subscriptions

export const users = schema.table('users', user)
export type TenantUsersSchema = typeof users

export function tenantSchema(schema: string) {
  const tenantSchema = pgSchema(schema)

  const addresses = tenantSchema.table('addresses', address)
  const companies = tenantSchema.table('companies', company)
  const companyAddresses = tenantSchema.table(
    'company_addresses',
    companyAddress
  )

  const contents = tenantSchema.table('contents', content, contentOptions)
  const customers = tenantSchema.table('customers', customer, customerOptions)
  const medias = tenantSchema.table('media', media)
  const menus = tenantSchema.table('menus', menu)
  const orders = tenantSchema.table('orders', order, orderOptions)
  const pageMedias = tenantSchema.table(
    'pageMedias',
    pagesMedia,
    pagesMediaOptions
  )
  const pageSections = tenantSchema.table(
    'pageSections',
    pagesSection,
    pagesSectionOptions
  )
  const pages = tenantSchema.table('pages', page)
  const pricingPlans = tenantSchema.table(
    'pricing_plans',
    pricingPlan,
    pricingPlanOptions
  )
  const products = tenantSchema.table('products', product)
  const sections = tenantSchema.table('sections', section)
  const sectionsMedias = tenantSchema.table(
    'sectionsMedias',
    sectionsMedia,
    sectionsMediaOptions
  )
  const seos = tenantSchema.table('seos', seo, seoOptions)
  const subscriptions = tenantSchema.table(
    'subscriptions',
    subscription,
    subscriptionOptions
  )
  const users = tenantSchema.table('users', user)

  return {
    addresses,
    companies,
    companyAddresses,
    contents,
    customers,
    medias,
    menus,
    orders,
    pageMedias,
    pageSections,
    pages,
    pricingPlans,
    products,
    sections,
    sectionsMedias,
    seos,
    subscriptions,
    users,
  }
}
