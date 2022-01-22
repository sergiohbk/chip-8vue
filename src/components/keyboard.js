import { keymap, NUMBER_OF_KEYS } from "./variables/KeyboardConstants";

export class Keyboard{
    constructor(){
        this.keys = new Array(NUMBER_OF_KEYS).fill(false);
        document.addEventListener('keydown', (event) => this.keydown(event.key));
        //pasa una funcion de flecha que recibe el evento
        document.addEventListener('keyup',(event) => this.keyup(event.key));
    }
    keydown(key){
        
        const keyIndex = keymap.findIndex((mapkey) => mapkey === key.toLowerCase());
        //se pasa el evento con () se compara el valor del evento (mapkey) con el valor del evento key, si son iguales se retorna el indice
        //busca el indice en el array que sea igual al key
        if(keyIndex > -1){
            //se comprueba con -1 porque es lo que retorna el findIndex si no encuentra nada
            this.keys[keyIndex] = true;
            console.log(this.keys);
        }
    }
    keyup(key){
        const keyIndex = keymap.findIndex((mapkey) => mapkey === key.toLowerCase());
        //busca el indice en el array que sea igual al key
        if(keyIndex > -1){
            this.keys[keyIndex] = false;
        }
    }

    iskeyDown(keyIndex){
        return this.keys[keyIndex];
    }
    
    haskeyDown(){
        //funcion para saber si hay alguna tecla presionada
        return this.keys.findIndex((key) => key);
    }
}