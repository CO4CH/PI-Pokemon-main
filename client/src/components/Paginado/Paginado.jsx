import styles from './Paginado.module.css'

export default function Paginado ({pokemonsPerPage, allPokemons, paginado, page}){
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className= {styles.pagination}>
                { pageNumbers && pageNumbers.map( number => (
                        <li key={number} className={styles.number}>
                           <button className={styles.pagButton} style={ page === number ? {color:"white"} : {}}onClick={() => paginado(number)}>{number}</button>
                        </li>
                ))}
            </ul>
        </nav>
    )
}