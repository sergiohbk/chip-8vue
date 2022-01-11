import {DISPLAY_WIDTH, DISPLAY_HEIGHT, DISPLAY_MULTIPLY, BG_COLOR, COLOR} from './variables/DisplayConstants.js';

export class Display{
    constructor(){
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
                this.frameBuffer[i].push(0);
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
        if(typeof value !== 'undefined' || value !== null){
            //console.log("drawing pixel at " + x + "," + y);
            this.graphics.fillStyle = COLOR;
        }else{
            //console.log("clearing pixel at " + x + "," + y);
            this.graphics.fillStyle = BG_COLOR;
        }
        this.graphics.fillRect(x * DISPLAY_MULTIPLY,y * DISPLAY_MULTIPLY, DISPLAY_MULTIPLY, DISPLAY_MULTIPLY);
    }
}