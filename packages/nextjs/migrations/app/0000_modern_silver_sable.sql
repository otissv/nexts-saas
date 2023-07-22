CREATE SCHEMA "app";

CREATE TABLE IF NOT EXISTS "app"."addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"street_address" varchar (256) NOT NULL,
	"address_details" varchar (256),
	"city" varchar (256) NOT NULL,
	"state" varchar (256),
	"postal_code" varchar (256) NOT NULL,
	"country" varchar (256) NOT NULL,
	"type" varchar NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_customer_id" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"iso_code" varchar (5) NOT NULL,
	"english_name" varchar (256) NOT NULL,
	"native_name" varchar (256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."oauth_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" varchar (256) NOT NULL,
	"provider_id" varchar (256) NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"status" varchar (256) NOT NULL,
	"total_amount" money NOT NULL,
	"currency" varchar (256) NOT NULL,
	"payment_intent_id" varchar (256),
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."payment_methods" (
);

CREATE TABLE IF NOT EXISTS "app"."pricing_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"active" boolean DEFAULT false NOT NULL,
	"unit_amount" money NOT NULL,
	"currency" varchar (3) NOT NULL,
	"type" varchar NOT NULL,
	"interval" varchar NOT NULL,
	"interval_count" integer NOT NULL,
	"trial_period_days" integer,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) NOT NULL,
	"description" text NOT NULL,
	"price" varchar (256) NOT NULL,
	"image_url" text,
	"slug" varchar (256),
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) UNIQUE CHECK (id > 0) NOT NULL,
	"description" text,
	"privileges" text
);

CREATE TABLE IF NOT EXISTS "app"."subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
	"price_id" integer NOT NULL,
	"status" varchar NOT NULL,
	"auto_renew" boolean DEFAULT true NOT NULL,
	"quantity" integer NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"current_period_start" timestamp with time zone DEFAULT now() NOT NULL,
	"current_period_end" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone DEFAULT now() NOT NULL,
	"cancel_at" timestamp with time zone DEFAULT now() NOT NULL,
	"canceled_at" timestamp with time zone DEFAULT now() NOT NULL,
	"trial_start" timestamp with time zone DEFAULT now() NOT NULL,
	"trial_end" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar (25) UNIQUE NOT NULL,
	"password" varchar (256),
	"email" varchar (256) UNIQUE NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"first_name" varchar (256),
	"last_name" varchar (256),
	"phone" varchar (256),
	"image_url" text,
	"roles" integer,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "stripe_customer_id_idx" ON "app"."customers" ("stripe_customer_id");
CREATE INDEX IF NOT EXISTS "provider_id_idx" ON "app"."oauth_providers" ("provider_id");
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "app"."oauth_providers" ("user_id");
CREATE INDEX IF NOT EXISTS "slug_idx" ON "app"."products" ("slug");
CREATE INDEX IF NOT EXISTS "owner_id_idx" ON "app"."tenants" ("owner_id");
CREATE INDEX IF NOT EXISTS "username_idx" ON "app"."users" ("username");
DO $$ BEGIN
 ALTER TABLE "app"."addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."customers" ADD CONSTRAINT "customers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."oauth_providers" ADD CONSTRAINT "oauth_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."pricing_plans" ADD CONSTRAINT "pricing_plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "app"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."subscriptions" ADD CONSTRAINT "subscriptions_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."subscriptions" ADD CONSTRAINT "subscriptions_price_id_pricing_plans_id_fk" FOREIGN KEY ("price_id") REFERENCES "app"."pricing_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."tenants" ADD CONSTRAINT "tenants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "app"."users" ADD CONSTRAINT "users_roles_roles_id_fk" FOREIGN KEY ("roles") REFERENCES "app"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
