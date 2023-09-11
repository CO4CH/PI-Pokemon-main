import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import styles from './Detail.module.css';

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Obtener los detalles del Pokémon usando la acción getDetail
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    // Obtener el estado del detalle del Pokémon desde el almacenamiento global
    const myPokemon = useSelector(state => state.detail);

    const getBackgroundColor = () => {
        // Lógica para obtener el color de fondo basado en el tipo del Pokémon
        if (myPokemon.types && myPokemon.types.length > 0) {
            switch (
                myPokemon.types[0] === 'object'
                    ? myPokemon.types[0].nombre
                    : myPokemon.types[0]
            ) {
                case 'grass':
                    return 'rgb(16, 150, 23, 0.5)';
                case 'fire':
                    return 'rgb(224, 121, 10, 0.6)';
                // Agrega más casos para otros tipos de Pokémon aquí...
                default:
                    return '#eee8e8a8'; // Color predeterminado si no se encuentra el tipo
            }
        } else {
            return '#eee8e8a8'; // Color predeterminado si no se encuentran tipos
        }
    };

    return (
        <div className={styles.container}>
            {myPokemon ? (
                <div className={styles.details} style={{ backgroundColor: getBackgroundColor() }}>
                    <div className={styles.header}>
                        <div className={styles.id}>ID: {myPokemon.id}</div>
                        <h1>{myPokemon.nombre}</h1>
                    </div>
                    <img src={myPokemon.imagen} alt="" width="200px" height="250px" />
                    <div className={styles.types}>
                        {myPokemon.types ? (
                            myPokemon.types.map((type, index) => (
                                // Renderizar los tipos de Pokémon como imágenes
                                <img
                                    src={`../../images/types/${typeof type === 'object' ? type.nombre : type}.png`}
                                    alt={typeof type === 'object' ? type.nombre : type}
                                    height="45px"
                                    key={index}
                                />
                            ))
                        ) : (
                            <span>Types not found</span>
                        )}
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.attribute}>
                            <span className={styles.attributeName}>Hp:</span> {myPokemon.vida}
                        </div>
                        <div className={styles.attribute}>
                            <span className={styles.attributeName}>Attack:</span> {myPokemon.ataque}
                        </div>
                        <div className={styles.attribute}>
                            <span className={styles.attributeName}>Defense:</span> {myPokemon.defensa}
                        </div>
                        {/* Condición para mostrar la velocidad */}
                        {myPokemon.velocidad && (
                            <div className={styles.attribute}>
                                <span className={styles.attributeName}>Speed:</span> {myPokemon.velocidad}
                            </div>
                        )}
                        {/* Condición para mostrar la altura */}
                        {myPokemon.altura && (
                            <div className={styles.attribute}>
                                <span className={styles.attributeName}>Height:</span>{" "}
                                <span style={{ textTransform: "lowercase" }}>
                                    {(myPokemon.altura / 10).toFixed(1)} M
                                </span>
                            </div>
                        )}
                        {/* Condición para mostrar el peso */}
                        {myPokemon.peso && (
                            <div className={styles.attribute}>
                                <span className={styles.attributeName}>Weight:</span>{" "}
                                {(myPokemon.peso / 10).toFixed(1)} kg
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.loading}>
                    <p>Loading your Pokémon...</p>
                    <img src="/images/pokebolaloading.gif" alt="pokebolaloading" height={130} width={130} />
                </div>
            )}
            <p>
                <Link to="/home">
                    <button className={styles.buttonDetail}>Return</button>
                </Link>
            </p>
        </div>
    );
}
