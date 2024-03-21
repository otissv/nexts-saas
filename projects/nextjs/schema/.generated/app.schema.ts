import { sql } from 'drizzle-orm'

import {
  money,
  serial,
  text,
  timestampz,
  varchar,
  boolean,
  index,
  integer,
  pgSchema,
} from '../../database/pg/data-types.pg'

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

const SCHEMA = 'app'
export const appSchema = pgSchema(SCHEMA)

export const tenants = appSchema.table('tenants', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
})
export type TenantSchema = typeof tenants

export const oauthProviders = appSchema.table(
  'oauth_providers',
  {
    id: serial('id').primaryKey(),
    tenantId: integer('tenant_id')
      .references(() => tenants.id)
      .notNull(),
    provider: varchar('provider', { length: 256 }).notNull(),
    providerId: varchar('provider_id', { length: 256, unique: true }).notNull(),
    createdAt: timestampz('created_at').notNull(),
    updatedAt: timestampz('updated_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => {
    return {
      providerIdIndex: index('provider_id_oauth_providers_idx').on(
        table.providerId
      ),
      tenantIdIndex: index('tenant_id_oauth_providers_idx').on(table.tenantId),
    }
  }
)
export type OauthProviderSchema = typeof oauthProviders

/**
 * Users
 * Note: This table contains user data. Users should only be able to view and update their own data.
 */
export const users = appSchema.table(
  'users',
  {
    id: serial('id').primaryKey(),
    tenantId: integer('tenant_id')
      .references(() => tenants.id)
      .notNull(),
    username: varchar('username', { length: 25, unique: true }).notNull(),
    password: varchar('password', { length: 256 }),
    email: varchar('email', { length: 256, unique: true }).notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),
    firstName: varchar('first_name', { length: 256 }),
    lastName: varchar('last_name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    imageUrl: text('image_url'),
    rolesId: integer('roles').references(() => roles.id),
    createdAt: timestampz('created_at').notNull(),
    updatedAt: timestampz('updated_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => {
    return {
      usernameIndex: index('username_users_idx').on(table.username),
      tenantIdIndex: index('tenant_id_users_idx').on(table.tenantId),
    }
  }
)
export type UserSchema = typeof users

/**
 * ROLES
 * Note: This table should be accessed by admins only.
 */
export const roles = appSchema.table('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', {
    length: 256,
    unique: true,
    check: `id > 0`,
  }).notNull(),
  description: text('description'),
  privileges: text('privileges'),
})
export type RoleSchema = typeof roles

/**
 * Addresses
 */
export const addresses = appSchema.table('addresses', {
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
  type: varchar('type').notNull(),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
})
export type AddressSchema = typeof addresses

/**
 * Orders
 */
export const orders = appSchema.table('orders', {
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
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
})
export type OrderSchema = typeof orders

export const paymentMethods = appSchema.table('payment_methods', {})
export type PaymentMethodSchema = typeof paymentMethods

/**
 * CUSTOMERS
 * Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
 */
export const customers = appSchema.table(
  'customers',
  {
    id: serial('id')
      .references(() => users.id)
      .primaryKey(),
    stripeCustomerId: text('stripe_customer_id').notNull(),
  },
  (table) => {
    return {
      stripeCustomerIdIndex: index('stripe_customer_id_idx').on(
        table.stripeCustomerId
      ),
    }
  }
)
export type CustomerSchema = typeof customers

/**
 * PRODUCTS
 * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
export const products = appSchema.table(
  'products',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: text('description').notNull(),
    price: varchar('price', { length: 256 }).notNull(),
    imageUrl: text('image_url'),
    slug: varchar('slug', { length: 256 }),
    createdAt: timestampz('created_at').notNull(),
    updatedAt: timestampz('updated_at')
      .notNull()
      .default(sql`now()`),
  },
  (table) => {
    return {
      slugIndex: index('slug_idx').on(table.slug),
    }
  }
)
export type ProductSchema = typeof products

/**
 * PRICING PLANS
 * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
export const pricingPlans = appSchema.table('pricing_plans', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').references(() => products.id),
  active: boolean('active').notNull().default(false),
  /** The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).*/
  unitAmount: money('unit_amount').notNull(),
  /* Three-letter ISO currency code, in lowercase. */
  currency: varchar('currency', { length: 3 }).notNull(),
  /* One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase. */
  type: varchar('type').notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  interval: varchar('interval').notNull(),
  /* The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. */
  intervalCount: integer('interval_count').notNull(),
  /* Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https:/*stripe.com/docs/api#create_subscription-trial_from_plan). */
  trialPeriodDays: integer('trial_period_days'),
  createdAt: timestampz('created_at').notNull(),
  updatedAt: timestampz('updated_at')
    .notNull()
    .default(sql`now()`),
})
export type PricingPlanSchema = typeof pricingPlans

export const subscriptions = appSchema.table('subscriptions', {
  /* Subscription ID from Stripe, e.g. sub_1234. */
  id: serial('id').primaryKey(),
  tenantId: integer('tenant_id')
    .references(() => tenants.id)
    .notNull(),
  /* ID of the price that created this subscription. */
  priceId: integer('price_id')
    .references(() => pricingPlans.id)
    .notNull(),
  /* The status of the subscription object, one of subscription_status type above. */
  status: varchar('status').notNull(),
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
})
export type SubscriptionSchema = typeof subscriptions

export const languages = appSchema.table('languages', {
  id: serial('id').primaryKey(),
  isoCode: varchar('iso_code', { length: 5 }).notNull(),
  englishName: varchar('english_name', { length: 256 }).notNull(),
  nativeName: varchar('native_name', { length: 256 }).notNull(),
})
export type LanguagesSchema = typeof languages
