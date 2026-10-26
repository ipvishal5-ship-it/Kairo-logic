CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organisation` text NOT NULL,
	`message` text NOT NULL,
	`consent` integer NOT NULL,
	`actor_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_created_idx` ON `enquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `enquiries_actor_created_idx` ON `enquiries` (`actor_hash`,`created_at`);