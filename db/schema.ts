import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const enquiries = sqliteTable(
  "enquiries",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    organisation: text("organisation").notNull(),
    message: text("message").notNull(),
    consent: integer("consent", { mode: "boolean" }).notNull(),
    actorHash: text("actor_hash").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("enquiries_created_idx").on(table.createdAt),
    index("enquiries_actor_created_idx").on(table.actorHash, table.createdAt),
  ],
);
