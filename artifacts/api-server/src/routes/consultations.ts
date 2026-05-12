import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db, consultationsTable, insertConsultationSchema } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router = Router();

/**
 * GET /api/consultations
 * Returns all consultations for the authenticated user.
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    const consultations = await db
      .select()
      .from(consultationsTable)
      .where(
        and(
          eq(consultationsTable.userId, userId),
          eq(consultationsTable.isActive, true)
        )
      )
      .orderBy(consultationsTable.createdAt);

    res.json(consultations);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/consultations
 * Submit a new rosacea intake consultation.
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    const parsed = insertConsultationSchema.safeParse({
      ...req.body,
      userId,
    });

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const [consultation] = await db
      .insert(consultationsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json(consultation);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/consultations/:id
 * Returns a single consultation (only if it belongs to the user).
 */
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const [consultation] = await db
      .select()
      .from(consultationsTable)
      .where(
        and(
          eq(consultationsTable.id, id),
          eq(consultationsTable.userId, userId)
        )
      )
      .limit(1);

    if (!consultation) {
      return res.status(404).json({ error: "Consultation not found" });
    }

    res.json(consultation);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PATCH /api/consultations/:id
 * Update a consultation (patient can only update pending ones).
 */
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const existing = await db
      .select()
      .from(consultationsTable)
      .where(
        and(
          eq(consultationsTable.id, id),
          eq(consultationsTable.userId, userId)
        )
      )
      .limit(1);

    if (!existing[0]) {
      return res.status(404).json({ error: "Consultation not found" });
    }

    if (existing[0].status !== "pending") {
      return res
        .status(403)
        .json({ error: "Cannot edit a consultation that is no longer pending" });
    }

    const allowed = insertConsultationSchema
      .pick({
        rednessLevel: true,
        primarySymptom: true,
        triggersJson: true,
        currentMedications: true,
        allergies: true,
        previousTreatments: true,
      })
      .partial();

    const parsed = allowed.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const [updated] = await db
      .update(consultationsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(consultationsTable.id, id))
      .returning();

    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
