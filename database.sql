
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "user" (
	"id" SERIAL NOT NULL,
	"username" varchar(255) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin_status" int DEFAULT 0
) WITH (
  OIDS=FALSE
);



CREATE TABLE "car_type" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "request" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"car_type_id" int NOT NULL,
	"request_status_id" varchar(255) NOT NULL,
	"pickup_location" varchar(255) NOT NULL,
	"destination" varchar(255) NOT NULL,
	"date/time" TIMESTAMP(255) NOT NULL,
	"request_status" varchar(255) DEFAULT "PENDING"
) WITH (
  OIDS=FALSE
);





ALTER TABLE "request" ADD CONSTRAINT "request_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk1" FOREIGN KEY ("car_type_id") REFERENCES "car_type"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk2" FOREIGN KEY ("request_status_id") REFERENCES ""("");
ALTER TABLE "request" ADD CONSTRAINT "request_fk3" FOREIGN KEY ("pickup_location") REFERENCES "request_status"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk4" FOREIGN KEY ("destination") REFERENCES "request_status"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk5" FOREIGN KEY ("date/time") REFERENCES ""("");
ALTER TABLE "request" ADD CONSTRAINT "request_fk6" FOREIGN KEY ("distance_api") REFERENCES "request_status"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk7" FOREIGN KEY ("request_status") REFERENCES "request_status"("id");




