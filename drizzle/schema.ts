import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const biologyActivities = mysqlTable("biology_activities", {
  id: varchar("id", { length: 64 }).primaryKey(),
  studentId: varchar("studentId", { length: 64 }).notNull(),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  questionsJson: text("questionsJson").notNull(),
  answersJson: text("answersJson"),
  objectiveScore: int("objectiveScore"),
  submittedAt: timestamp("submittedAt"),
  syncStatus: varchar("syncStatus", { length: 32 }).default("PENDING").notNull(),
  appsScriptRow: int("appsScriptRow"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type BiologyActivity = typeof biologyActivities.$inferSelect;

// TODO: Add your tables here
