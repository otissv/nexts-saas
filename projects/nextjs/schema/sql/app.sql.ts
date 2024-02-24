import { sql } from 'drizzle-orm'

export function appSql() {
  return sql.raw(`CREATE SCHEMA IF NOT EXISTS "app";

--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_customer_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"iso_code" varchar (5) NOT NULL,
	"english_name" varchar (256) NOT NULL,
	"native_name" varchar (256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."oauth_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
	"provider" varchar (256) NOT NULL,
	"provider_id" varchar (256) UNIQUE NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."payment_methods" (

);
--> statement-breakpoint
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
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (256) UNIQUE CHECK (id > 0) NOT NULL,
	"description" text,
	"privileges" text
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar (100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
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

`)
}
