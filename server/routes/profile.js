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



app.post("/api/profile", async (req, res) => {
  const { name, role, skills, mark, grade } = req.body;

  const result = await pool.query(
    `UPDATE profile
     SET name=$1, role=$2, skills=$3, mark=$4, grade=$5
     WHERE id=$6 RETURNING *`,
    [name, role, skills, mark, grade, "41547720-f028-4c23-937d-4ece35993c59"]
  );

  res.json(result.rows[0]);
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