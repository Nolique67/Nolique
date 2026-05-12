import { pgTable, text, uuid, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ─── profiles ────────────────────────────────────────────────────────────────
// Mirrors auth.users from Supabase. Created via database trigger on sign-up.
export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey(), // matches auth.users.id
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectProfileSchema = createSelectSchema(profilesTable);
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;

// ─── consultations ────────────────────────────────────────────────────────────
// Stores rosacea intake assessment submissions.
export const consultationsTable = pgTable("consultations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),
  status: text("status", {
    enum: ["pending", "under_review", "approved", "declined", "active", "cancelled"],
  })
    .notNull()
    .default("pending"),

  // Intake answers
  rednessLevel: integer("redness_level"), // 1–10
  primarySymptom: text("primary_symptom"), // flushing | bumps | burning | dryness
  triggersJson: text("triggers_json"), // JSON array of triggers

  // Medical
  currentMedications: text("current_medications"),
  allergies: text("allergies"),
  previousTreatments: text("previous_treatments"),

  // Provider notes
  providerNotes: text("provider_notes"),
  prescriptionId: text("prescription_id"),

  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertConsultationSchema = createInsertSchema(consultationsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectConsultationSchema = createSelectSchema(consultationsTable);
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultationsTable.$inferSelect;
