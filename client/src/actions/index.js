import axios from 'axios';

// Acción para obtener todos los Pokémon
export const getPokemons = () => {
    return async (dispatch) => {
        // Realizar una solicitud GET para obtener todos los Pokémon
        const response = await axios.get('http://localhost:3001/pokemons');
        // Despachar una acción con los datos obtenidos
        return dispatch({
            type: 'GET_POKEMONS',
            payload: response.data,
        });
    };
};

// Acción para obtener todos los tipos de Pokémon
export const getTypes = () => {
    return async (dispatch) => {
        // Realizar una solicitud GET para obtener todos los tipos de Pokémon
        const response = await axios.get('http://localhost:3001/types');
        // Despachar una acción con los tipos de Pokémon obtenidos
        return dispatch({
            type: 'GET_TYPES',
            payload: response.data,
        });
    };
};

// Acción para crear un nuevo Pokémon
export const createPokemon = (pokemonData) => {
    return async (dispatch) => {
        // Realizar una solicitud POST para crear un nuevo Pokémon
        const response = await axios.post('http://localhost:3001/pokemons', pokemonData);
        // Devolver una acción con la respuesta de la creación
        return {
            type: 'CREATE_POKEMON',
            payload: response,
        };
    };
};  

// Acción para obtener Pokémon por nombre
export function getPokemonByName(name) {
    return async function(dispatch) {
        try {
            // Realizar una solicitud GET para obtener Pokémon por nombre
            const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            // Despachar una acción con los Pokémon obtenidos por nombre
            return dispatch({
                type: "GET_POKEMON_BY_NAME",
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// Acción para obtener los detalles de un Pokémon por su ID
export function getDetail(id) {
    return async function (dispatch) {
        try {
            // Realizar una solicitud GET para obtener los detalles de un Pokémon por su ID
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
            // Despachar una acción con los detalles del Pokémon
            return dispatch({
                type: "GET_DETAILS",
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// Acción para ordenar alfabéticamente la lista de Pokémon
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
} 

// Acción para filtrar Pokémon creados en la API o en la base de datos
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}  

// Acción para ordenar los Pokémon por su fuerza de ataque
export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

// Acción para filtrar Pokémon por su tipo
export function filterType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}
