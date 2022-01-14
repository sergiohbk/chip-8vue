import {DISPLAY_WIDTH, DISPLAY_HEIGHT, DISPLAY_MULTIPLY, BG_COLOR, COLOR} from './variables/DisplayConstants.js';
import { SPRITE_GROUP_WIDTH } from './variables/SpriteGroupConstants.js';

export class Display{
    constructor(memory){
        this.memory = memory;
        this.screen = document.getElementById("canvas");
        this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLY;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLY;
        this.graphics = this.screen.getContext("2d");
        this.frameBuffer = [];
        this.resetPixels();
        this.drawBuffer();
    }

    resetPixels(){
        for (let i = 0; i < DISPLAY_HEIGHT; i++) {
            this.frameBuffer.push([]);
            for (let j = 0; j < DISPLAY_WIDTH; j++) {
                this.frameBuffer[i].push();
            }
        }
        this.graphics.fillStyle = BG_COLOR;
        this.graphics.fillRect(0, 0, this.screen.width, this.screen.height);
    }
    drawBuffer(){
        for (let y = 0; y < DISPLAY_HEIGHT; y++) {
            for (let x = 0; x < DISPLAY_WIDTH; x++) {
                this.drawPixel(x,y, this.frameBuffer[y][x]);
            }
        }
    }
    drawPixel(x, y, value){
        if(value){
            //console.log("drawing pixel at " + x + "," + y);
            this.graphics.fillStyle = COLOR;
        }else{
            //console.log("clearing pixel at " + x + "," + y);
            this.graphics.fillStyle = BG_COLOR;
        }
        this.graphics.fillRect(x * DISPLAY_MULTIPLY,y * DISPLAY_MULTIPLY, DISPLAY_MULTIPLY, DISPLAY_MULTIPLY);
    }
    drawSprite(x, y, spriteAdress, length){
        for(let ly = 0; ly < length; ly++){
            //se ejecuta segun la altura length que se haya pasado
            const line =  this.memory[spriteAdress + ly];
            for(let lx = 0; lx < SPRITE_GROUP_WIDTH; lx++){
                //se ejecuta 8 veces por cada linea
                //es el maximo de width que puede tener un sprite
                const bitToCheck = (0b10000000 >> lx);
                //se comprueba cada bit con la operacion >> (shift right)
                const value = line & bitToCheck;
                //se compara con line, que es la posicion del sprite en memoria + la linea que se esta ejecutando
                this.drawPixel(x + lx, y + ly, value);
                //se pinta el pixel con el valor que se obtiene de la operacion & (and)
                //x + lx es la posicion en el eje x del pixel que se pasa por parametro, hasta donde llega (lx)
                //lo mismo para y + ly
            }
        }
    }
}