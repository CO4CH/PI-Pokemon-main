import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemons,
  orderByName,
  filterCreated,
  orderByAttack,
  getTypes,
  filterType
} from '../../actions';
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
  const types = useSelector((state) => state.types)
  const searchNotFound = useSelector((state) => state.searchNotFound)

  // PAGINADO....
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // PAGINADO.....

  const [orden, setOrden] = useState('')

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch])

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
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
    <div className={styles.home}>
      <NavBar />

      <button onClick={e => { handleClick(e) }} className={styles.poke}>
        <img src={'images/Pokebola.png'} alt="pokebola" width='20px' /> Reload all
      </button>

      <div className={styles.sortfilter}>
        <select onChange={e => handleSort(e)}>
          <option value="name">Name</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select onChange={e => handleSortAttack(e)}>
          <option value="strength">Strength</option>
          <option value="strong">Stronger</option>
          <option value="weak">Weaker</option>
        </select>

        <select onChange={e => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="created">Created</option>
        </select>
        <select onChange={e => handleFilterType(e)}>
          <option value="all">All types</option>
          {
            types.map(type => (
              <option
                value={typeof type === 'object' ? type.nombre : type}
                key={typeof type === 'object' ? type.nombre : type}
              >
                {typeof type === 'object' ? type.nombre : type}
              </option>
            ))
          }
        </select>
      </div>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
        page={currentPage}
      />
      <div className={styles.cards}>
        {searchNotFound ? (
          <div className={styles.loading}>
            <img src='images/loading.gif' alt="Loading..." width='200px' />
            <span>Loading...</span>
          </div>
        ) : (
          currentPokemons.length ? (
            currentPokemons.map((el) => (
              <div key={el.id}>
                <Link to={"/home/" + el.id} style={{ textDecoration: "none" }}>
                  <Card
                    name={el.nombre}
                    types={el.types}
                    sprite={el.imagen ? el.imagen : "/images/random.png"}
                    key={el.id}
                    weight={el.peso}
                    height={el.altura}
                  />
                </Link>
              </div>
            ))
          ) : (
            currentPokemons.length === 0 ? (
              <div className={styles.notfound}>
                <span>Pokemons not found</span>
              </div>
            ) : (
              // Esto es para mostrar el componente de carga cuando no hay resultados
              <div className={styles.loading}>
                <img src='images/loading.gif' alt="Loading..." width='200px' />
                <span>Loading...</span>
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
