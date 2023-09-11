import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import styles from './Detail.module.css';

export default function Detail(props) {
    
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myPokemon = useSelector( state => state.detail)

    const [section, setSection] = useState(1);

    const getBackgroundColor = () => {
        // Esta función debe retornar un color basado en el primer tipo del Pokémon
        // Por ejemplo, puedes usar un switch para asignar un color a cada tipo
        switch (myPokemon.types[0] === 'object' ? myPokemon.types[0].nombre : myPokemon.types[0]) {
            case 'grass':
				return 'rgb(16, 150, 23, 0.5)';

			case 'fire':
				return 'rgb(224, 121, 10, 0.6)';
				
			case 'water':
				return 'rgb(10, 121, 224, 0.3)';
				
			case 'bug':
				return 'rgb(8, 65, 12, 0.5)';
				
			case 'electric':
				return 'rgb(208, 194, 8, 0.6)';
				
			case 'poison':
				return 'rgb(156, 64, 209, 0.6)';
				
			case 'fairy':
				return 'rgb(135, 61, 142, 0.7)';
				
			case 'normal':
				return 'rgb(182, 182, 182, 0.7)';
				
			case 'ground':
				return 'rgb(99, 41, 2, 0.54)';
				
			case 'ghost':
				return 'rgb(63, 14, 67, 0.55)';
				
			case 'flying':
				return 'rgb(113, 154, 182, 0.9)';
				
			case 'fighting':
				return 'rgb(97, 4, 21, 0.48)';
				
			case 'rock':
				return 'rgb(44, 24, 28, 0.6)';
				
			case 'steel':
				return 'rgb(60, 59, 59, 0.4)';
				
			case 'psychic':
				return 'rgb(223, 127, 226, 0.5)';
				
			case 'ice':
				return 'rgb(112, 215, 247, 0.4)';
				
			case 'dragon':
				return 'rgb(59, 63, 255, 0.6)';
				
			case 'dark':
				return 'rgb(48, 48, 49, 0.5)';
				
			case 'shadow':
				return '#0e0e37c5';
				
			default:
				return '#eee8e8a8';
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
            <div className={styles.attribute}>
              <span className={styles.attributeName}>Speed:</span> {myPokemon.velocidad}
            </div>
            <div className={styles.attribute}>
            <span className={styles.attributeName}>Height:</span>{" "}
            <span style={{ textTransform: "lowercase" }}>
                {(myPokemon.altura / 10).toFixed(1)} M
            </span>

            </div>
            <div className={styles.attribute}>
            <span className={styles.attributeName}>Weight:</span> {(myPokemon.peso / 10).toFixed(1)} kg
            </div>
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