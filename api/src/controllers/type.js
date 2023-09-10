const axios = require('axios');
const { Type } = require('../db');

// Controlador para obtener todos los tipos de Pokémon
const getAllTypes = async () => {
    try {
        // Consultar todos los tipos de la base de datos
        const types = await Type.findAll();

        // Si la base de datos está vacía, obtener los tipos de la API y guardarlos
        if (types.length === 0) {
            const apiTypes = await fetchApiTypes(); // Obtener tipos de la API
            await saveApiTypesToDatabase(apiTypes); // Guardar tipos en la base de datos
            return apiTypes;
        } else {
            return types; // Devolver directamente los tipos de la base de datos
        }
    } catch (err) {
        console.error(err);
        return { error: "Hubo un error al obtener los tipos de Pokémon." };
    }
};

// Función para obtener los tipos de la API
const fetchApiTypes = async () => {
    try {
        // Realizar una solicitud para obtener la lista de tipos desde la API
        const response = await axios.get("https://pokeapi.co/api/v2/type");

        // Mapear la respuesta para obtener solo los nombres de tipos
        const types = response.data.results.map((type) => type.name);
        return types;
    } catch (error) {
        console.error(error);
        return { error: "Error al obtener tipos de la API." };
    }
};

// Función para guardar los tipos de la API en la base de datos
const saveApiTypesToDatabase = async (apiTypes) => {
    try {
        // Crear un arreglo de objetos para los registros de tipos a insertar en la base de datos
        const typeRecords = apiTypes.map((typeName) => {
            return { nombre: typeName };
        });

        // Utilizar bulkCreate para insertar todos los registros en la base de datos
        await Type.bulkCreate(typeRecords);

        return typeRecords;
    } catch (error) {
        console.error(error);
        return { error: "Error al guardar tipos en la base de datos." };
    }
};

module.exports = {
    getAllTypes,
};
