const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


// GET all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// UPDATE profile
router.put("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const { NAME, ROLE, SKILLS, MARK, GRADE } = req.body;

    const updated = await prisma.profile.update({
      where: { ID: id },
      data: {
        NAME,
        ROLE,
        SKILLS,
        MARK,
        GRADE
      }
    });

    res.json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// LIKE / ENDORSE profile
router.post("/:id/endorse", async (req, res) => {

  try {

    const { id } = req.params;

    const updated = await prisma.profile.update({
      where: { ID: id },
      data: {
        LIKES: {
          increment: 1
        }
      }
    });

    res.json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;