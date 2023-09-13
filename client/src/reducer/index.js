// Estado inicial de la aplicación
const initialState = {
    pokemons: [],           // Lista de Pokémon actual
    allPokemons: [],        // Todos los Pokémon sin filtrar
    types: [],              // Tipos de Pokémon disponibles
    detail: [],      // Detalles de un Pokémon seleccionado
    searchNotFound: false,
}

// Reducer que gestiona el estado de la aplicación
function rootReducer(state = initialState, action) {
    switch (action.type) {
        // Caso para obtener todos los Pokémon
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,     // Actualizar la lista de Pokémon
                allPokemons: action.payload,  // Actualizar la lista de todos los Pokémon sin filtrar
                searchNotFound: false,
            }

        // Caso para obtener todos los tipos de Pokémon
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,        // Actualizar la lista de tipos de Pokémon
            };

        // Caso para crear un nuevo Pokémon
        case "CREATE_POKEMON":
            return {
                ...state,
            };

        // Caso para obtener Pokémon por nombre
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokemons: action.payload, 
                searchNotFound: false    // Actualizar la lista de Pokémon filtrados por nombre
            };

        case "POKEMON_SEARCH_NOT_FOUND":
            return {
                ...state,
                searchNotFound: true, // Establece searchNotFound en true cuando no se encuentra un Pokémon
            };

        // Caso para obtener detalles de un Pokémon
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload, // Actualizar los detalles de un Pokémon
            };

        // Caso para ordenar Pokémon por nombre (ascendente o descendente)
        case 'ORDER_BY_NAME':
            
            let sortedArr
            if(action.payload === 'asc'){
                sortedArr = state.pokemons.sort(function (a, b){
                        if(a.nombre > b.nombre){
                            return 1;
                        }
                        if(b.nombre > a.nombre){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'desc'){
                sortedArr = state.pokemons.sort(function (a, b){
                        if(a.nombre > b.nombre){
                            return -1;
                        }
                        if(b.nombre > a.nombre){
                            return 1;
                        }
                        return 0;
                    }) 
            }

            if(action.payload === 'name'){
                const apiPokes = state.pokemons.filter( el => !el.createdInDb).sort(function (a, b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                    return 0;
                }) 
                const dbPokes = state.pokemons.filter( el => el.createdInDb).sort(function (a, b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                    return 0;
                }) 
                sortedArr = [...apiPokes, ...dbPokes]
            }
            return {
                ...state,
                pokemons: sortedArr,
            }

        // Caso para filtrar Pokémon creados en la base de datos o no
        case 'FILTER_CREATED':
            const createdFilter =
                action.payload === 'created' ?
                    state.allPokemons.filter(el => el.createdInDb) :
                    state.allPokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'all' ?
                    state.allPokemons :
                    createdFilter,           // Actualizar la lista de Pokémon según el filtro
            }

        // Caso para ordenar Pokémon por fuerza de ataque (ascendente o descendente)
        case 'ORDER_BY_ATTACK':
            let sortedAttack 
            if(action.payload === 'strong'){
                sortedAttack = state.pokemons.sort(function (a, b){
                    if (a.ataque > b.ataque) {
                        return -1;
                    }
                    if (b.ataque > a.ataque) {
                        return 1;
                    }
                    return 0;
                }) 
            }
            if(action.payload === 'weak'){
                sortedAttack = state.pokemons.sort(function (a, b){
                    if(a.ataque > b.ataque) {
                        return 1;}
                    if(b.ataque > a.ataque) {
                        return -1;}
                    return 0;
                }) 
            }

            if(action.payload === 'strength'){
                const apiPokes = state.pokemons.filter( el => !el.createdInDb).sort(function (a, b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                    return 0;
                }) 
                const dbPokes = state.pokemons.filter( el => el.createdInDb).sort(function (a, b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                    return 0;
                }) 
                sortedAttack = [...apiPokes, ...dbPokes]
            }
            
            return {
                ...state,
                pokemons: sortedAttack,    // Actualizar la lista de Pokémon ordenados por ataque
            }

        // Caso para filtrar Pokémon por tipo
        case 'FILTER_BY_TYPE':
            const pokemonByType = state.allPokemons
            const statusFiltered = action.payload === "all" ?
                pokemonByType :
                pokemonByType.filter((e) => e.types.includes(action.payload))
            return {
                ...state,
                pokemons: statusFiltered,  // Actualizar la lista de Pokémon filtrados por tipo
            }

        default:
            return state;   // Devolver el estado sin cambios si la acción no coincide con ningún caso
    }
}

export default rootReducer;
