import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName, filterCreated, orderByAttack, getTypes, filterType } from '../../actions';
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const types = useSelector((state)=> state.types)
    
    //PAGINADO....
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; 
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) 
    }
    //PAGINADO.....

    const [orden, setOrden] = useState('')

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        }


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());   
        },[dispatch])

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }   

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterType(e.target.value));
        setCurrentPage(1);
        setOrden(` ${e.target.value}`);
      }

  

    return (
        <div>

            <h1 className={styles.titulo}>Search by attack, type or even more</h1>

            <div className={styles.buttonContainer}>
            {/* BOTON CREAR POKEMON */}
            <button className={styles.buttoncreate}> <Link to= '/pokemon'>Create Pokemon</Link> </button>
            {/* BOTON RELOAD POKEMON */}
            <button className={styles.buttonReload} onClick={e => {handleClick(e)}}> Reload Pokemons</button>
            </div>

            {/* INICIO FILTRADOS */}
            <div className={styles.selectionfilterscontainer}>
                
                    <select className={styles.selectbtns} onChange={e=> handleSort(e)}>
                        <option>ORDER BY NAME</option>
                        <option value = 'asc'>Ascending order</option>
                        <option value = 'desc'>Descending order</option>
                    </select>
                    
                    <select className={styles.selectbtns} onChange={e => {handleSortAttack(e)}}>
                        <option>STRENGTH</option>
                        <option value = 'strong'>Stronger attack</option>
                        <option value = 'weak'>Weaker attack</option>
                    </select>

                    <select className={styles.selectbtns} onChange={(e) => {handleFilterType(e);}}>
                        <option>BY TYPE</option>
                        {types?.map((e) => (
                        <option value={e.nombre}>{e.nombre}</option>))}
                    </select>

                    <select className={styles.selectbtns} onChange={e=> handleFilterCreated(e)}>
                        <option>CREATOR</option>
                        <option value="all">Show all...</option>
                        <option value="api">Reals</option>
                        <option value="created">Created</option>
                    </select>
                
            </div>
            {/* CIERRE FILTRADOS */}

            <div>        
                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons = {allPokemons.length}
                    paginado={paginado}
                    page={currentPage}
                />
            </div>    
            
                <SearchBar/>


            {/* INICIO DE CARD */}
            <div className={styles.containerCards}>
                {currentPokemons.map((ob) => {
                 return(
                        <div className={styles.cards}>
                            <Link to ={`/pokemons/${ob.id}`} >
                                    <Card 
                                        name={ob.nombre}
                                        sprite={ob.imagen}
                                        types={ob.types}
                                        key={ob.id}/>
                            </Link>

                        </div>    
                        )
                })
                }
            </div>
            {/* CIERRE DE CARD */}

        </div>//CIERRE DE RETURN
    )
}