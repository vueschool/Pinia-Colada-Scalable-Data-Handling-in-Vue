CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`stock` integer NOT NULL
);
