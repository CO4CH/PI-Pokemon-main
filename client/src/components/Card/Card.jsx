import styles from "./Card.module.css";
import styled from 'styled-components';

export default function Card({ name, sprite, id, types }) {      

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
                    {types?.map((type)=>{
                        let typeName = typeof type === 'object' ? type.nombre : type;
                        return(
                            <img src={`images/Types/${typeName}.png`} alt={typeName} height="25px" key={typeName}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </Containercard>
  
  );
}