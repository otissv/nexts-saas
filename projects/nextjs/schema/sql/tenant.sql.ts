import { sql } from 'drizzle-orm'

export function tenantsSql(schemaId: number) {
  const schema = `t_${schemaId}`

  return sql.raw(`CREATE SCHEMA IF NOT EXISTS ${schema};

	CREATE TABLE IF NOT EXISTS ${schema}."addresses" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."cms_collection_columns" (
		"id" serial PRIMARY KEY NOT NULL,
		"dataset_id" varchar (50) NOT NULL,
		"column_name" varchar (100) NOT NULL,
		"field_id" varchar (15) NOT NULL,
		"type" varchar (100) NOT NULL,
		"default_value" jsonb,
		"help" text DEFAULT '',
		"fieldOptions" jsonb,
		"validation" jsonb,
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
	CREATE TABLE IF NOT EXISTS ${schema}."cms_documents" (
		"id" serial PRIMARY KEY NOT NULL,
		"dataset_id" varchar (50) NOT NULL,
		"data" jsonb,
		"created_by" integer NOT NULL,
		"created_at" timestamp with time zone NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_by" integer NOT NULL
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS ${schema}."cms_collections" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."companies" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."customers" (
		"id" serial PRIMARY KEY NOT NULL,
		"stripe_customer_id" text
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS ${schema}."media" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."menus" (
		"id" serial PRIMARY KEY NOT NULL,
		"items" json,
		"created_by" integer NOT NULL,
		"created_at" timestamp with time zone NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_by" integer NOT NULL
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS ${schema}."orders" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."pageSections" (
		"id" serial PRIMARY KEY NOT NULL,
		"page_id" integer NOT NULL,
		"content" jsonb,
		"created_by" integer NOT NULL,
		"created_at" timestamp with time zone NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_by" integer NOT NULL
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS ${schema}."pageSectionsMedias" (
		"id" serial PRIMARY KEY NOT NULL,
		"section_id" integer NOT NULL,
		"media_id" integer NOT NULL,
		"created_by" integer NOT NULL,
		"created_at" timestamp with time zone NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_by" integer NOT NULL
	);
	--> statement-breakpoint
	CREATE TABLE IF NOT EXISTS ${schema}."pages" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."pricing_plans" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."products" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."seos" (
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
	CREATE TABLE IF NOT EXISTS ${schema}."subscriptions" (
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
		"created_by" integer NOT NULL,
		"created_at" timestamp with time zone NOT NULL,
		"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
		"updated_by" integer NOT NULL
	);
	`)
}
