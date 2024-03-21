import { sql } from 'drizzle-orm'

import {
  links,
  menuItems,
  money,
  serial,
  text,
  timestampz,
  varchar,
  boolean,
  index,
  integer,
  json,
  jsonb,
  pgSchema,
} from '../../database/pg/data-types.pg'

export type ColumnTypes =
  | 'text'
  | 'multi-reference'
  | 'reference'
  | 'number'
  | 'rich-text'
  | 'rich-content'

type ColumnType = {
  displayName: string
  fieldId: string
  type: ColumnTypes
  defaultValue?: string
  enableDelete?: boolean
  enableSort?: boolean
  enableHide?: boolean
  enableFilter?: boolean

  index?: {
    direction: 'asc' | 'desc'
    nulls: 'first' | 'last'
  }

  // user settings
  order?: number
  filter?: string
}

export type MultiReferenceColumn = ColumnType & {
  validation?: { required?: boolean }
}

export type NumberColumn = ColumnType & {
  validation?: { required?: boolean; min?: number; max?: number }
}

export type ReferenceColumn = ColumnType & {
  validation?: { required?: boolean }
}

export type RichContentColumn = ColumnType & {
  validation?: { required?: boolean }
}

export type RichTextColumn = ColumnType & {
  validation?: { required?: boolean }
}

export type TextColumn = ColumnType & {
  validation?: { required?: boolean; minLength?: number; maxLength?: number }
}

export type Column =
  | MultiReferenceColumn
  | NumberColumn
  | ReferenceColumn
  | RichContentColumn
  | RichContentColumn
  | TextColumn

// const PRICING_TYPE = ['one_time', 'recurring']
// const PRICING_INTERVALS = ['month', 'year']
// const SUBSCRIPTION_STATUS = [
//   'trialing',
//   'active',
//   'canceled',
//   'incomplete',
//   'incomplete_expired',
//   'past_due',
//   'unpaid',
//   'paused',
// ]
// const ADDRESS_TYPE = ['billing', 'shipping']
// const PAGE_TYPE = ['page', 'post']
// const COLLECTION_TYPE = ['multiple', 'single']

const SCHEMA = 't_1'
const schema = pgSchema(SCHEMA)

const address = {
  id: serial('id').primaryKey(),
  companyId: integer('company_id')
    .references(() => companies.id)
    .notNull(),
  streetAddress: varchar('street_address', { length: 256 }).notNull(),
  addressDetails: varchar('address_details', { length: 256 }),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }),
  postalCode: varchar('postal_code', { length: 256 }).notNull(),
  country: varchar('country', { length: 256 }).notNull(),
  type: varchar('type', { length: 25 }).notNull(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const company = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }),
  website: text('website'),
  socialLinks: links('social_links'),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const dataset_id = varchar('dataset_id', { length: 50 }).notNull()

const cmsCollection = {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  datasetId: dataset_id.notNull(),
  collectionName: varchar('collection_name', { length: 256 }).notNull(),
  columnOrder: jsonb('column_order').$type<string[]>(),
  type: varchar('type', { length: 25 }).notNull(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const cmsCollectionColumn = {
  id: serial('id').primaryKey(),
  datasetId: dataset_id.notNull(),
  columnName: varchar('column_name', { length: 100 }).notNull(),
  fieldId: varchar('field_id', { length: 15 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  defaultValue: jsonb('default_value').$type<string[]>(),
  help: text('help').default(''),
  enableDelete: boolean('enable_delete').default(true),
  enableSortBy: boolean('enable_sort_by').default(true),
  enableHide: boolean('enable_hide').default(true),
  enableFilter: boolean('enable_filter').default(true),
  filter: jsonb('filter').$type<(string | boolean | number)[]>(),
  sortBy: varchar('sort_by', { length: 4 }).default('asc'),
  visibility: boolean('visibility').default(true),
  index: jsonb('index').$type<{
    direction: 'asc' | 'desc'
    nulls: 'first' | 'last'
  }>(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const CmsCollectionDocument = {
  id: serial('id').primaryKey(),
  datasetId: dataset_id.notNull(),
  data: jsonb('data'),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
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
    stripeCustomerIdIndex: index('stripe_customer_id_customers_idx').on(
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
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const menu = {
  id: serial('id').primaryKey(),
  items: menuItems('items'),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

/**
 * Orders
 */
const order = {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  customerId: integer('customer_id')
    .references(() => users.id)
    .notNull(),
  status: varchar('status', { length: 256 }).notNull(),
  totalAmount: money('total_amount').notNull(),
  currency: varchar('currency', { length: 256 }).notNull(),
  paymentIntentId: varchar('payment_intent_id', { length: 256 }),
  shippingMethod: varchar('shipping_method', { length: 256 }),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}
const orderOptions = (table: any) => {
  return {
    userIdIndex: index('user_id_orders_idx').on(table.userId),
    customerIdIndex: index('customer_id_orders_idx').on(table.customerId),
  }
}

const page = {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  categories: json('categories').$type<string[]>(),
  relatedTo: json('related_to').$type<number[]>(),
  type: varchar('type', { length: 25 }).notNull(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const pageSection = {
  id: serial('id').primaryKey(),
  pageId: integer('page_id')
    .references(() => pages.id)
    .notNull(),
  content: jsonb('content'),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

/**
 * PAGE SECTION MEDIA
 * Note: this is a private table that contains a mapping of section IDs to media IDs.
 * This is used to allow users to add multiple media to a section.
 */
const pageSectionsMedia = {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id')
    .references(() => pageSections.id)
    .notNull(),
  mediaId: integer('media_id')
    .references(() => medias.id)
    .notNull(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}
const pageSectionsMediaOptions = (table: any) => {
  return {
    sectionIdIndex: index('section_id_page_sectionsMedias_idx').on(
      table.sectionId
    ),
    mediaIdIndex: index('media_id_page_sectionsMedias_idx').on(table.mediaId),
  }
}

/**
 * PRICING PLANS
 * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const pricingPlan = {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  active: boolean('active').notNull().default(false),
  /** The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).*/
  unitAmount: money('unit_amount').notNull(),
  /* Three-letter ISO currency code, in lowercase. */
  currency: varchar('currency', { length: 3 }).notNull(),
  /* One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase. */
  type: varchar('type', { length: 25 }).notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  interval: varchar('interval').notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  intervalCount: integer('interval_count').notNull(),
  /* Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https:/*stripe.com/docs/api#create_subscription-trial_from_plan). */
  trialPeriodDays: integer('trial_period_days'),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}
const pricingPlanOptions = (table: any) => {
  return {
    productIdIndex: index('product_id_pricing_plans_idx').on(table.productId),
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
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

const subscription = {
  /* Subscription ID from Stripe, e.g. sub_1234. */
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  /* ID of the price that created this subscription. */
  priceId: integer('price_id')
    .references(() => pricingPlans.id)
    .notNull(),
  /* The status of the subscription object, one of subscription_status type above. */
  status: varchar('status', { length: 25 }).notNull(),
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
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}
const subscriptionOptions = (table: any) => {
  return {
    userIndex: index('user_id_subscription_idx').on(table.userId),
    priceIdIndex: index('price_subscription_id_idx').on(table.priceId),
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
  keywords: json('keywords').$type<string[]>(),
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}
const seoOptions = (table: any) => {
  return {
    seoIdIndex: index('page_id_seo_idx').on(table.pageId),
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
  createdBy: integer('created_by').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
  updatedBy: integer('updated_by').notNull(),
}

export const addresses = schema.table('addresses', address)
export type TenantAddressSchema = typeof addresses

export const companies = schema.table('companies', company)
export type TenantCompanySchema = typeof companies

export const cmsCollections = schema.table('cms_collections', cmsCollection)
export type TenantCmsCollectionsSchema = typeof cmsCollections

export const cmsCollectionColumns = schema.table(
  'cms_collection_columns',
  cmsCollectionColumn
)
export type TenantCmsCollectionsColumnsSchema = typeof cmsCollectionColumns

export const cmsCollectionDocuments = schema.table(
  'cms_documents',
  CmsCollectionDocument
)
export type TenantCmsCollectionDocumentSchema = typeof cmsCollectionDocuments

export const customers = schema.table('customers', customer, customerOptions)
export type TenantCustomerSchema = typeof customers

export const medias = schema.table('media', media)
export type TenantMediaSchema = typeof medias

export const menus = schema.table('menus', menu)
export type TenantMenuSchema = typeof menu

export const orders = schema.table('orders', order, orderOptions)
export type TenantOrderSchema = typeof orders

export const pages = schema.table('pages', page)
export type TenantPageSchema = typeof pages

export const pageSections = schema.table('pageSections', pageSection)
export type TenantPageSectionSchema = typeof pageSection

export const pageSectionsMedias = schema.table(
  'pageSectionsMedias',
  pageSectionsMedia,
  pageSectionsMediaOptions
)
export type TenantPageSectionMediaSchema = typeof pageSectionsMedia

export const pricingPlans = schema.table(
  'pricing_plans',
  pricingPlan,
  pricingPlanOptions
)
export type TenantPricingPlanSchema = typeof pricingPlan

export const products = schema.table('products', product)
export type TenantProductSchema = typeof product

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

export function tenantSchema(schemaId: number) {
  const tenantSchema = pgSchema(`t_${schemaId}`)

  const addresses = tenantSchema.table('addresses', address)
  const companies = tenantSchema.table('companies', company)

  const customers = tenantSchema.table('customers', customer, customerOptions)
  const medias = tenantSchema.table('media', media)
  const menus = tenantSchema.table('menus', menu)
  const orders = tenantSchema.table('orders', order, orderOptions)
  const pages = tenantSchema.table('pages', page)

  const pageSections = tenantSchema.table('pageSections', pageSection)
  const pageSectionsMedias = tenantSchema.table(
    'pageSectionsMedias',
    pageSectionsMedia,
    pageSectionsMediaOptions
  )
  const pricingPlans = tenantSchema.table(
    'pricing_plans',
    pricingPlan,
    pricingPlanOptions
  )
  const products = tenantSchema.table('products', product)
  const seos = tenantSchema.table('seos', seo, seoOptions)
  const subscriptions = tenantSchema.table(
    'subscriptions',
    subscription,
    subscriptionOptions
  )
  const users = tenantSchema.table('users', user)

  const cmsCollections = tenantSchema.table('cms_collections', cmsCollection)
  const cmsCollectionColumns = tenantSchema.table(
    'cms_collection_columns',
    cmsCollectionColumn
  )
  const cmsCollectionDocuments = tenantSchema.table(
    'cms_documents',
    CmsCollectionDocument
  )

  return {
    addresses,
    cmsCollectionColumns,
    cmsCollectionDocuments,
    cmsCollections,
    companies,
    customers,
    medias,
    menus,
    orders,
    pageSections,
    pageSectionsMedias,
    pages,
    pricingPlans,
    products,
    seos,
    subscriptions,
    users,
  }
}
