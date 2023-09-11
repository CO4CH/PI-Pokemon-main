const express = require("express");
const router = express.Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { getPokeapi, getPokedb, objPokeApi, getAllPoke} = require("../controllers/pokemon.js");
const { Sequelize } = require('sequelize');

// Ruta para obtener todos los Pokémon o buscar por nombre
router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      // Si no se proporciona un nombre en el query, obtener todos los Pokémon
      const pokemonData = await getAllPoke();
      res.status(200).send(pokemonData);
    } else {
      // Si se proporciona un nombre en el query, buscar Pokémon por nombre

      // Buscar en la base de datos local
      const dbPokemons = await Pokemon.findAll({
        where: {
          nombre: {
            [Sequelize.Op.iLike]: `%${name}%`, // Realizar una búsqueda case-insensitive
          },
        },
        include: Type, // Incluir información de tipos
      });

      // Realizar una solicitud a la API externa para buscar Pokémon por nombre
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
      const apiResponse = await axios.get(apiUrl);
      const apiPokemon = objPokeApi(apiResponse.data);

      // Si no se encuentra ningún Pokémon en la base de datos ni en la API, lanzar un error
      if (dbPokemons.length === 0 && !apiPokemon) {
        throw new Error("Pokemons not found");
      }

      // Combinar los resultados de la base de datos y la API, eliminando valores nulos
      const combinedPokemons = [...dbPokemons, apiPokemon].filter(Boolean);

      // Enviar la lista de Pokémon encontrados como respuesta
      res.status(200).send(combinedPokemons);
    }
  } catch (err) {
    // Capturar errores y enviar un mensaje de error como respuesta
    res.status(404).send("Pokemons not found");
  }
});

// Ruta para obtener un Pokémon por ID
router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params; // Obtener el ID del parámetro de la ruta

    try {
        if (idPokemon.includes("-")) {
            // Si el ID contiene un guión, se asume que es un Pokémon de la base de datos (porque es un UUID)
            const pokemon = await Pokemon.findByPk(idPokemon, {
                include: {
                    model: Type, // Incluye la información de los tipos
                    attributes: ["nombre"],
                    through: {
                        attributes: []
                    }
                }
            });

            if (pokemon) {
                // Si se encontró el Pokémon en la base de datos, enviarlo como respuesta
                res.status(200).send(pokemon);
            } else {
                // Si no se encontró el Pokémon en la base de datos, generar un error
                throw new Error("Pokemon not found");
            }
        } else {
            // Si el ID no contiene un guión, se asume que es un Pokémon de la API
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
            const apiResponse = await axios.get(apiUrl);
            const apiPokemon = objPokeApi(apiResponse.data);

            // Enviar el Pokémon de la API como respuesta
            if (apiPokemon) {
                // Si se encontró el Pokémon en la api, enviarlo como respuesta
                res.status(200).send(apiPokemon);
            } else {
                // Si no se encontró el Pokémon en la api, generar un error
                throw new Error("Pokemon not found");
            }
        }
    } catch (err) {
        // Capturar errores y enviar un mensaje de error como respuesta
        res.status(404).send(err.message); // Usar el mensaje de error como respuesta
    }
});

// Ruta para crear un nuevo Pokémon
router.post("/", async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        // Crear el Pokémon en la base de datos
        const newPokemon = await Pokemon.create({
            nombre: name,
            imagen: image,
            vida: hp,
            ataque: attack,
            defensa: defense,
            velocidad: speed || null,
            altura: height || null,
            peso: weight || null,
        });

        // Relacionar los tipos con el nuevo Pokémon
        const tiposRelacionados = await Type.findAll({ where: { nombre: types } });
        await newPokemon.addTypes(tiposRelacionados);

        res.status(201).send("Pokemon created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating Pokemon");
    }
});

module.exports = router;