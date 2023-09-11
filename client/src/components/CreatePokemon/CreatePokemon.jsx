import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createPokemon, getTypes, getPokemons} from '../../actions'
import styles from "./CreatePokemon.module.css";
import validate from './Validation'
import swal from 'sweetalert';

export default function PokemonCreated(){

    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map( pok => pok.nombre.toLowerCase()))
    const history = useHistory()

    const [errors, setErrors] = useState({})
    const [section, setSection] = useState(1);

    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
    })

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }, pokemons))
    }

    
    function handleSection(e){
        e.preventDefault();

        Object.keys(errors).length === 1 && errors.types.length ?
            setSection(section === 1 ? 2 : 1) 
            :
            swal("You must complete the form correctly!", "", "error");
    }

    function handleChecked(e){
        if (e.target.checked) {
            setInput({
            ...input,
            types: [...input.types , e.target.value]
            })

            setErrors(validate({
                ...input,
                types: [...input.types , e.target.value]
            }, pokemons))
            
        } else if (!e.target.checked) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
                })

            setErrors(validate({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            }, pokemons))    
        }
    };

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length === 0 && input.name.length){
            dispatch(createPokemon(input));
            dispatch(getPokemons());
            swal("Good job!", "Pokemon created successfuly!", "success");
            setInput({
                name: '',
                image: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                weight: '',
                height: '',
                types: [],
            })
            history.push("/home")
        } else{
            swal("You must choose at least one type!", "", "error");
        }  
    }


    return(
        <div className={styles.pagina}>
            <img className={styles.createImage}  src="/images/CreatePokemon.png" alt="text"/>
            <Link to='/home' className={styles.back} style={{textDecoration: 'none'}}><button>Return home</button></Link>
            <div className={styles.container}>
                <form onSubmit={ (e) => handleSubmit(e) }>
                    <section className={section === 1 ? styles.show : styles.hide}>
                    <div className={styles.formdiv} >
                        <label>Name</label>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={ (e) => handleChange(e) }
                            style={input.name.length ? errors.name ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                            autocomplete="off"
                        />
                        {
                            errors.name ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.name}</p>
                                </div>
                            ) :
                            input.name.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Hp</label>
                        <input 
                            type="number"
                            value={input.hp}
                            name="hp"
                            onChange={ (e) => handleChange(e) }
                            style={input.hp.length ? errors.hp ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.hp ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.hp}</p>
                                </div>
                            ) :
                            input.hp.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Attack</label>
                        <input 
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={ (e) => handleChange(e) }
                            style={input.attack.length ? errors.attack ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.attack ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.attack}</p>
                                </div>
                            ) :
                            input.attack.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Defense</label>
                        <input 
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={ (e) => handleChange(e) }
                            style={input.defense.length ? errors.defense ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.defense ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.defense}</p>
                                </div>
                            ) :
                            input.defense.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Speed</label>
                        <input 
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={ (e) => handleChange(e) }
                            style={input.speed.length ? errors.speed ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.speed ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.speed}</p>
                                </div>
                            ) :
                            input.speed.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Height</label>
                        <input 
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={ (e) => handleChange(e) }
                            style={input.height.length ? errors.height ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.height ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.height}</p>
                                </div>
                            ) :
                            input.height.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }

                    </div>
                    <div className={styles.formdiv}>
                        <label>Weight</label>
                        <input 
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={ (e) => handleChange(e) }
                            style={input.weight.length ? errors.weight ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.weight ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.weight}</p>
                                </div>
                            ) :
                            input.weight.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={styles.formdiv}>
                        <label>Image URL</label>
                        <input
                            type="url"
                            alt='not found' 
                            value={input.image} 
                            name='image'   
                            onChange={handleChange}
                            className={input.image.length ? errors.image ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}    
                        />
                        {
                            errors.image ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.image}</p>
                                </div>
                            ) :
                            input.image.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <button onClick={(e) => {handleSection(e)}}>Next</button>
                    </section>
                    <section className={section === 2 ? styles.show : styles.hide}>
                        <div style={{position:'relative'}}> 
                            <span className={styles.choosetypes} style={{display:'flex', justifyContent:'flex-start', fontFamily:'Open Sans'}}>Choose up to 2 Pokemon types</span>

                            <div className={styles.containertypes}>
                            {
                                types.map( type => (
                                    <label for={type.nombre}>
                                        <div className={styles.bytype} > 
                                            <input 
                                                    type="checkbox" 
                                                    id={type.nombre} 
                                                    value={type.nombre}
                                                    onChange={(e) => handleChecked(e)}
                                            />
                                            <div className={styles.typesimg} style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                                            ><img src={`images/Types/${type.nombre}.png`} alt={`${type.nombre}`} height="40px" /></div>
                                        </div>
                                    </label>
                                ))
                            }  
                            </div>  
                            
                                {
                                    errors.types ? (
                                        <div className={styles.typeserror}>
                                            <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                            <span>{errors.types}</span>
                                        </div>
                                    ) :
                                    <i></i>
                                }
                        </div>  

                        <div style={{display:'flex', flexFlow:'row nowrap'}}> 
                            <button className={styles.previous} onClick={(e) => {handleSection(e)}}>Previous</button>
                            <button className={styles.create} type='submit'>Create</button>
                        </div>
                        
                    </section>   
                    

                </form>
            </div>

        </div>
    )
}    