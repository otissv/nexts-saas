import { sql } from 'drizzle-orm'

export function tenantsSql(schema: string) {
  return sql.raw(`CREATE SCHEMA IF NOT EXISTS ${schema};

	CREATE TABLE IF NOT EXISTS ${schema}."addresses" (
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
	
	CREATE TABLE IF NOT EXISTS ${schema}."companies" (
		"id" serial PRIMARY KEY NOT NULL,
		"name" varchar (256) NOT NULL,
		"email" varchar (256) NOT NULL,
		"phone" varchar (256),
		"website" text,
		"social_links" json,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);

	CREATE TABLE IF NOT EXISTS ${schema}."company_addresses" (
		"id" serial PRIMARY KEY NOT NULL,
		"company_id" integer NOT NULL,
		"site" varchar (256),
		"street_address" varchar (256) NOT NULL,
		"address_details" varchar (256),
		"city" varchar (256) NOT NULL,
		"state" varchar (256),
		"postal_code" varchar (256) NOT NULL,
		"country" varchar (256) NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."contents" (
		"id" serial PRIMARY KEY NOT NULL,
		"section_id" integer NOT NULL,
		"text" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."customers" (
		"id" serial PRIMARY KEY NOT NULL,
		"stripe_customer_id" text
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."media" (
		"id" serial PRIMARY KEY NOT NULL,
		"url" text NOT NULL,
		"description" text NOT NULL,
		"width" integer,
		"height" integer,
		"caption" text,
		"category" varchar (256),
		"type" varchar (256) NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."menus" (
		"id" serial PRIMARY KEY NOT NULL,
		"items" json,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."orders" (
		"id" serial PRIMARY KEY NOT NULL,
		"user_id" integer NOT NULL,
		"customer_id" integer NOT NULL,
		"status" varchar (256) NOT NULL,
		"total_amount" money NOT NULL,
		"currency" varchar (256) NOT NULL,
		"payment_intent_id" varchar (256),
		"shipping_method" varchar (256),
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."pages" (
		"id" serial PRIMARY KEY NOT NULL,
		"name" varchar (256) NOT NULL,
		"heading1" text,
		"heading2" text,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."pageMedias" (
		"id" serial PRIMARY KEY NOT NULL,
		"page_id" integer NOT NULL,
		"media_id" integer NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."pageSections" (
		"id" serial PRIMARY KEY NOT NULL,
		"page_id" integer NOT NULL,
		"section_id" integer NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."pricing_plans" (
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
	
	CREATE TABLE IF NOT EXISTS ${schema}."products" (
		"id" serial PRIMARY KEY NOT NULL,
		"name" varchar (256) NOT NULL,
		"description" text,
		"price" varchar (256) NOT NULL,
		"image_url" text,
		"slug" varchar (256),
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."sections" (
		"id" serial PRIMARY KEY NOT NULL,
		"heading1" text,
		"heading2" text,
		"category" varchar (256),
		"type" varchar (256),
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."sectionsMedias" (
		"id" serial PRIMARY KEY NOT NULL,
		"section_id" integer NOT NULL,
		"media_id" integer NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."seos" (
		"id" serial PRIMARY KEY NOT NULL,
		"page_id" integer NOT NULL,
		"title" varchar (256) NOT NULL,
		"description" text NOT NULL,
		"author" varchar (256),
		"keywords" varchar (256) [],
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
	
	CREATE TABLE IF NOT EXISTS ${schema}."subscriptions" (
		"id" serial PRIMARY KEY NOT NULL,
		"user_id" integer NOT NULL,
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
	
	CREATE TABLE IF NOT EXISTS ${schema}."users" (
		"id" serial PRIMARY KEY NOT NULL,
		"username" varchar (256) NOT NULL,
		"email" varchar (256) NOT NULL,
		"first_name" varchar (256),
		"last_name" varchar (256),
		"phone" varchar (256),
		"image_url" text,
		"password" varchar (256),
		"email_verified" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
	);
		
	`)
}

export function tenantsSqlAfter(schema: string) {
  return sql.raw(`
	
CREATE INDEX IF NOT EXISTS "stripe_customer_id_index" ON ${schema}."customers" ("stripe_customer_id");

DO $$ BEGIN
 ALTER TABLE ${schema}."companies" ADD CONSTRAINT "companies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES ${schema}."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."company_addresses" ADD CONSTRAINT "addresses_user_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES ${schema}."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."contents" ADD CONSTRAINT "contents_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES ${schema}."sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."customers" ADD CONSTRAINT "customers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES ${schema}."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES ${schema}."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES ${schema}."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."pageMedias" ADD CONSTRAINT "pageMedias_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES ${schema}."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."pageMedias" ADD CONSTRAINT "pageMedias_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES ${schema}."media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."pageSections" ADD CONSTRAINT "pageSections_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES ${schema}."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."pageSections" ADD CONSTRAINT "pageSections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES ${schema}."sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."pricing_plans" ADD CONSTRAINT "pricing_plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES ${schema}."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."sectionsMedias" ADD CONSTRAINT "sectionsMedias_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES ${schema}."sections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."sectionsMedias" ADD CONSTRAINT "sectionsMedias_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES ${schema}."media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."seos" ADD CONSTRAINT "seos_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES ${schema}."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES ${schema}."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE ${schema}."subscriptions" ADD CONSTRAINT "subscriptions_price_id_pricing_plans_id_fk" FOREIGN KEY ("price_id") REFERENCES ${schema}."pricing_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

	`)
}
