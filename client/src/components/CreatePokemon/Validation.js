

export default function validate(input, pokemons){
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;  

    if(!input.name){
        errors.name = 'A name is required'
    }
    if(!input.image){
        errors.image = 'A image URL is required'
    }
    if(pokemons.indexOf( input.name.toLowerCase() ) !== -1){
        errors.name = 'A pokemon with that name is already existing'
    }
    if(!RegExpression.test(input.name)){
        errors.name = 'Numbers or special characters are not allowed'
    }
    if(input.name.length > 18){
        errors.name = `The name can't be longer than 18 characters`
    }

    if(input.hp < 1 || input.hp > 255){
        if(input.hp < 1 ){
            errors.hp = 'The life of the Pokemon must be higher than 1'
        }
        if( input.hp > 255){
            errors.hp = 'The life of the Pokemon must be less than 255'
        } 
    }
    if(input.attack < 1 || input.attack > 255){
        if(input.attack < 1 ){
            errors.attack = 'The attack of the Pokemon must be higher than 1'
        }
        if( input.attack > 255){
            errors.attack = 'The attack of the Pokemon must be less than 255'
        } 
    }
    if(input.defense < 1 || input.defense > 255){
        if(input.defense < 1 ){
            errors.defense = 'The defense of the Pokemon must be higher than 1'
        }
        if( input.defense > 255){
            errors.defense = 'The defense of the Pokemon must be less than 255'
        } 
    }
    if (input.speed && (input.speed < 1 || input.speed > 255)) {
        if (input.speed < 1) {
          errors.speed = 'The speed of the Pokemon must be higher than 1';
        }
        if (input.speed > 255) {
          errors.speed = 'The speed of the Pokemon must be less than 255';
        }
      }
    
      if (input.weight && (input.weight < 1 || input.weight > 1500)) {
        if (input.weight < 1) {
          errors.weight = 'The weight of the Pokemon must be higher than 1';
        }
        if (input.weight > 1500) {
          errors.weight = 'The weight of the Pokemon must be less than 1500';
        }
      }
    
      if (input.height && (input.height < 1 || input.height > 80)) {
        if (input.height < 1) {
          errors.height = 'The height of the Pokemon must be higher than 1';
        }
        if (input.height > 80) {
          errors.height = 'The height of the Pokemon must be less than 80';
        }
      }
    
    if(!input.types.length){
        errors.types = 'Must choose a pokemon type'
    }
    if(input.types.length > 2){
        errors.types = `You can't choose more than 2 types per Pokemon`
    }
    
    return errors;
}