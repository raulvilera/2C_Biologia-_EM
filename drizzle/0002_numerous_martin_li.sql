CREATE TABLE `biology_student_submissions` (
	`studentId` varchar(64) NOT NULL,
	`activityId` varchar(64) NOT NULL,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `biology_student_submissions_studentId` PRIMARY KEY(`studentId`),
	CONSTRAINT `biology_student_submissions_activityId_unique` UNIQUE(`activityId`)
);
