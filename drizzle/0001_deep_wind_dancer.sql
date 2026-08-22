CREATE TABLE `biology_activities` (
	`id` varchar(64) NOT NULL,
	`studentId` varchar(64) NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`questionsJson` text NOT NULL,
	`answersJson` text,
	`objectiveScore` int,
	`submittedAt` timestamp,
	`syncStatus` varchar(32) NOT NULL DEFAULT 'PENDING',
	`appsScriptRow` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `biology_activities_id` PRIMARY KEY(`id`)
);
