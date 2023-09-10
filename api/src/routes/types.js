const express = require("express");
const router = express.Router();
const { getAllTypes } = require("../controllers/type");

// Ruta para obtener todos los tipos de Pokémon
router.get("/", async (req, res) => {
    try {
        const types = await getAllTypes();
        res.status(200).send(types);
    } catch (err) {
        res.status(500).send("An error occurred while fetching Pokémon types.");
    }
});

module.exports = router;
