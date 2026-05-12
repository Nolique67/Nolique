import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, profilesTable, insertProfileSchema } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router = Router();

/**
 * GET /api/users/me
 * Returns the current user's profile.
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    const [profile] = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.id, userId))
      .limit(1);

    if (!profile) {
      // Auto-create profile on first login (idempotent upsert)
      const [created] = await db
        .insert(profilesTable)
        .values({
          id: userId,
          email: req.user!.email ?? "",
          fullName: req.user!.user_metadata?.full_name ?? null,
          avatarUrl: req.user!.user_metadata?.avatar_url ?? null,
        })
        .onConflictDoNothing()
        .returning();
      return res.json(created);
    }

    res.json(profile);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /api/users/me
 * Update the current user's profile.
 */
router.patch("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    const parsed = insertProfileSchema
      .pick({ fullName: true, avatarUrl: true })
      .safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const [updated] = await db
      .update(profilesTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(profilesTable.id, userId))
      .returning();

    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
