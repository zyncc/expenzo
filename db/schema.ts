import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expensesSchema = sqliteTable("expenses", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  category: text().notNull(),
  borrower: text().notNull(),
  date: text().notNull(),
  price: int().notNull(),
});
