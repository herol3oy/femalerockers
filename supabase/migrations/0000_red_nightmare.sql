CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" varchar(50) NOT NULL,
	"artist_name" varchar(100) NOT NULL,
	"city_country" varchar(100),
	"main_instrument" varchar(50),
	"genre" varchar(50),
	"bio" text,
	"instagram_url" varchar(255),
	"video_link" varchar(255),
	"collab_status" boolean DEFAULT false,
	"is_approved" boolean DEFAULT false NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email"),
	CONSTRAINT "users_table_username_unique" UNIQUE("username")
);
