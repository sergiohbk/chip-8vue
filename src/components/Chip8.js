import {Display} from './Display.js';
import {Memory} from './Memory.js';
import { Registers } from './Registers.js';
import { Keyboard } from './Keyboard.js';
import { SPRITE_GROUP } from './variables/SpriteGroupConstants.js';
import { SPRITE_GROUP_ADDRESS } from './variables/MemoryConstants.js';

export class Chip8{
    constructor(){
        console.log("Chip8 constructor"); 
        this.memory = new Memory();
        this.loadSpriteGroup(this.memory);
        this.registers = new Registers();
        this.keyboard = new Keyboard();
        this.display = new Display(this.memory.memory);
    }

    sleep(ms = 500){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    loadSpriteGroup(memory){
        memory.memory.set(SPRITE_GROUP, SPRITE_GROUP_ADDRESS);
    }
}