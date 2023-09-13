import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonByName } from '../../actions';
import style from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); // Inicializa el estado local 'name' con una cadena vacía.
    // Función para manejar cambios en el campo de búsqueda.
    function handleInputChange(e) {
        e.preventDefault();
        // Normaliza y actualiza el estado 'name' con el valor del campo de entrada.
        setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
    }

    // Función para manejar el envío del formulario de búsqueda.
    async function handleSubmit(e) {
        e.preventDefault();
        if (name !== '') {
            try {
                await dispatch(getPokemonByName(name)); // Dispara una acción para buscar Pokémon por nombre.
                setName(""); // Restablece el estado 'name' a una cadena vacía.
            } catch (error) {
                // Manejar errores, si es necesario
                console.log(error);
            }
        }
    }

    return (
        <div className={style.searchBox}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={style.searchTxt}
                    type="text"
                    placeholder="Search Pokemon..."
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                />
            </form>
        </div>
    );
}
