import styles from "./Card.module.css";
import styled from 'styled-components';

export default function Card({ name, sprite, id, types }) {

    function colorPicker(mainType) {
        switch (mainType) {
            case 'grass':
                return styles.grass;
            case 'Fire':
                return styles.fire;
            case 'Water':
                return styles.water;
            case 'Bug':
                return styles.bug;
            case 'electric':
                return styles.electric;
            case 'poison':
                return styles.poison;
            case 'fairy':
                return styles.fairy;
            case 'normal':
                return styles.normal;
            case 'ground':
                return styles.ground;
            case 'ghost':
                return styles.ghost;
            case 'flying':
                return styles.flying;
            case 'fighting':
                return styles.fighting;
            case 'rock':
                return styles.rock;
            case 'steel':
                return styles.steel;
            case 'psychic':
                return styles.psychic;
            case 'ice':
                return styles.ice;
            case 'dragon':
                return styles.dragon;
            case 'dark':
                return styles.dark;
            case 'shadow':
                return styles.shadow;
            default:
                return styles.default;
        }
    }
      

	const Containercard = styled.div`
		text-transform: capitalize;
		font-family: 'Poppins', sans-serif;
        color: white;
		display: flex;
		padding: 5px 10px;
		border-radius: 10px;
		justify-content: space-around;
		align-items: center;
		height: 300px;
		position: relative;
		max-width: 400px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		&:hover {
			transform: translateY(-3px);
			transition: 0.4s ease-in-out;
			box-shadow: 2px 3px 25px #09113f;
		}
	`;

  return (
    <Containercard>
        <div className={styles.container}>
            <div>
                <img  className={styles.img} src={sprite} alt="Img not found"  width="500px" heigth="550px"/>
                <h2>{name}</h2>
                <div className={styles.types}>
                    {types?.map((e)=>{
                        return(
                            <img src={`images/Types/${e}.png`} alt={e} height="25px" key={e}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </Containercard>
  
  );
}