const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Get profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like / Endorse profile
router.post("/:id/endorse", async (req, res) => {

  try {

    const { id } = req.params;

    const updated = await prisma.profile.update({
      where: { ID: id },   // must match schema
      data: {
        LIKES: { increment: 1 }   // must match schema
      }
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;