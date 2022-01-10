export class Keyboard{
    constructor(){
        document.addEventListener('keydown', this.keydown);
    }
    keydown(event){
        console.log("keydown", event.key);
    }
}