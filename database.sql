
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(255) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin_status" int DEFAULT 0
) WITH (
  OIDS=FALSE
);


CREATE TABLE "request" (
	"id" serial PRIMARY KEY,
	"user_id" int REFERENCES "user",
	"car_type" VARCHAR NOT NULL,
	"pickup_location" varchar(255) NOT NULL,
	"destination" varchar(255) NOT NULL,
	"date_time" TIMESTAMP NOT NULL,
	"request_status" varchar(255) DEFAULT 'PENDING'
) WITH (
  OIDS=FALSE
);