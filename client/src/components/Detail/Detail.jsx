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

    return (
        <div>
           
            {
                myPokemon ?
                <div className={styles.form}>
                    <h1>{myPokemon.nombre}</h1>
                    <img src= {myPokemon.imagen} alt='' width= '200px' height= '250px'/>
                    <h3 className={styles.types}>
                            {
                                myPokemon.types ? myPokemon.types.map( el => {
                                    return(
                                        <img src={`../../images/types/${el}.png`} alt="Types" height="25px" key={el}/>
                                    )
                                }
                                ) :
                                <span>Types not found</span>
                            }
                    </h3>                  
                    <h4>Hp: {myPokemon.vida}</h4>
                    <h4>Attack: {myPokemon.ataque}</h4>
                    <h4>Defense: {myPokemon.defensa}</h4>
                    <h4>Speed: {myPokemon.velocidad}</h4>
                    <h4>Height: {myPokemon.altura}</h4>
                    <h4>Weight: {myPokemon.peso}</h4>

                </div> 
                : 
                <div>
                <p> Loading your pokemon... </p>  
                <img src={'/images/pokebolaloading.gif'} alt="pokebolaloading" height={130} width={130} />
                </div>  
            }   
            <p>
                <Link to='/home' ><button className={styles.buttondetail}>Return</button></Link>
            </p>
        </div>
    )
}