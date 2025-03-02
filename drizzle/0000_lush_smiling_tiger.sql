CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`borrower` text NOT NULL,
	`date` text NOT NULL,
	`price` integer NOT NULL
);
