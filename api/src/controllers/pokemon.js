const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokeapi = async () => {
    try {
        // Realiza una solicitud para obtener la lista de los primeros 100 Pokémon
        const pokemonsRequest = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");

        // Mapear la lista de resultados y realizar solicitudes individuales para cada Pokémon
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));

        // Realizar todas las solicitudes de manera simultánea
        const infoUrlPokemons = await axios.all(pokemonsSubrequest);

        // Obtener la información detallada de cada Pokémon
        let pokemons = infoUrlPokemons.map(obj => obj.data);

        // Mapear la información para crear objetos de Pokémon personalizados
        let informacionPokemons = pokemons.map(pokemon => objPokeApi(pokemon));

        return informacionPokemons;
    } catch (error) {
        console.log(error);
        return error;
    }
};

// Función para crear objetos de Pokémon a partir de la información proporcionada por la API
const objPokeApi = (poke) => {
    const objPokeapi = {
        id: poke.id,
        nombre: poke.name,
        vida: poke.stats[0].base_stat,
        ataque: poke.stats[1].base_stat,
        defensa: poke.stats[2].base_stat,
        velocidad: poke.stats[5].base_stat,
        altura: poke.height,
        peso: poke.weight,
        imagen: poke.sprites.other['official-artwork'].front_default,
        types: poke.types.length < 2 ? [poke.types[0].type.name] : [poke.types[0].type.name, poke.types[1].type.name],
    };
    return objPokeapi;
};

const getPokedb = async () => {
    try {
        // Utiliza el método `findAll` de Sequelize para obtener todos los Pokémon de la base de datos
        return await Pokemon.findAll({
            // Incluye la información de los tipos asociados utilizando la opción `include`
            include: {
                // Indica el modelo asociado que deseas incluir (en este caso, Type)
                model: Type,
                // Define los atributos que deseas incluir de los tipos (en este caso, solo "nombre")
                attributes: ["nombre"],
                // Configura la relación muchos a muchos para que no incluya atributos adicionales
                through: {
                    attributes: [] // Aquí se define un arreglo vacío para no incluir atributos adicionales
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// Función para combinar los datos de la API y la base de datos
const getAllPoke = async () => {
    try {
        const apiData = await getPokeapi(); // Obtener datos de la API
        const dbData = await getPokedb();   // Obtener datos de la base de datos

        // Combinar los datos en un solo arreglo
        const combinedData = [...apiData, ...dbData];

        return combinedData;
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = {
    getPokeapi,
    getPokedb,
    objPokeApi,
    getAllPoke,
};