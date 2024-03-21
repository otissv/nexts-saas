CREATE TABLE IF NOT EXISTS "t_1"."addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"street_address" varchar (256) NOT NULL,
	"address_details" varchar (256),
	"city" varchar (256) NOT NULL,
	"state" varchar (256),
	"postal_code" varchar (256) NOT NULL,
	"country" varchar (256) NOT NULL,
	"type" varchar (25) NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."cms_collection_columns" (
	"id" serial PRIMARY KEY NOT NULL,
	"dataset_id" varchar (50) NOT NULL,
	"column_name" varchar (100) NOT NULL,
	"field_id" varchar (15) NOT NULL,
	"type" varchar (100) NOT NULL,
	"default_value" jsonb,
	"help" text DEFAULT '',
	"enable_delete" boolean DEFAULT true,
	"enable_sort_by" boolean DEFAULT true,
	"enable_hide" boolean DEFAULT true,
	"enable_filter" boolean DEFAULT true,
	"filter" jsonb,
	"sort_by" varchar (4) DEFAULT 'asc',
	"visibility" boolean DEFAULT true,
	"index" jsonb,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."cms_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"dataset_id" varchar (50) NOT NULL,
	"data" jsonb,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."cms_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"dataset_id" varchar (50) NOT NULL,
	"collection_name" varchar (256) NOT NULL,
	"column_order" jsonb,
	"type" varchar (25) NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) NOT NULL,
	"email" varchar (256) NOT NULL,
	"phone" varchar (256),
	"website" text,
	"social_links" json,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_customer_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."media" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"description" text NOT NULL,
	"width" integer,
	"height" integer,
	"caption" text,
	"category" varchar (256),
	"type" varchar (256) NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"items" json,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"status" varchar (256) NOT NULL,
	"total_amount" "money" NOT NULL,
	"currency" varchar (256) NOT NULL,
	"payment_intent_id" varchar (256),
	"shipping_method" varchar (256),
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."pageSections" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" integer NOT NULL,
	"content" jsonb,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."pageSectionsMedias" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) NOT NULL,
	"categories" json,
	"related_to" json,
	"type" varchar (25) NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."pricing_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"active" boolean DEFAULT false NOT NULL,
	"unit_amount" "money" NOT NULL,
	"currency" varchar (3) NOT NULL,
	"type" varchar (25) NOT NULL,
	"interval" varchar NOT NULL,
	"interval_count" integer NOT NULL,
	"trial_period_days" integer,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) NOT NULL,
	"description" text,
	"price" varchar (256) NOT NULL,
	"image_url" text,
	"slug" varchar (256),
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."seos" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" integer NOT NULL,
	"title" varchar (256) NOT NULL,
	"description" text NOT NULL,
	"author" varchar (256),
	"keywords" json,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"price_id" integer NOT NULL,
	"status" varchar (25) NOT NULL,
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
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t_1"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar (256) NOT NULL,
	"email" varchar (256) NOT NULL,
	"first_name" varchar (256),
	"last_name" varchar (256),
	"phone" varchar (256),
	"image_url" text,
	"password" varchar (256),
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stripe_customer_id_customers_idx" ON "t_1"."customers" ("stripe_customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_orders_idx" ON "t_1"."orders" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_id_orders_idx" ON "t_1"."orders" ("customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "section_id_page_sectionsMedias_idx" ON "t_1"."pageSectionsMedias" ("section_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_id_page_sectionsMedias_idx" ON "t_1"."pageSectionsMedias" ("media_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_id_pricing_plans_idx" ON "t_1"."pricing_plans" ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "page_id_seo_idx" ON "t_1"."seos" ("page_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_subscription_idx" ON "t_1"."subscriptions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "price_subscription_id_idx" ON "t_1"."subscriptions" ("price_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."addresses" ADD CONSTRAINT "addresses_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "t_1"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."customers" ADD CONSTRAINT "customers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "t_1"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "t_1"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."pageSections" ADD CONSTRAINT "pageSections_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "t_1"."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."pageSectionsMedias" ADD CONSTRAINT "pageSectionsMedias_section_id_pageSections_id_fk" FOREIGN KEY ("section_id") REFERENCES "t_1"."pageSections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."pageSectionsMedias" ADD CONSTRAINT "pageSectionsMedias_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "t_1"."media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."pricing_plans" ADD CONSTRAINT "pricing_plans_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "t_1"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."seos" ADD CONSTRAINT "seos_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "t_1"."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t_1"."subscriptions" ADD CONSTRAINT "subscriptions_price_id_pricing_plans_id_fk" FOREIGN KEY ("price_id") REFERENCES "t_1"."pricing_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
