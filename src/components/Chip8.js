import {Display} from './Display.js';
import {Memory} from './Memory.js';
import { Registers } from './Registers.js';
import { Keyboard } from './Keyboard.js';

export class Chip8{
    constructor(){
        console.log("Chip8 constructor");
        this.display = new Display();
        this.memory = new Memory();
        this.registers = new Registers();
        this.keyboard = new Keyboard();
    }
}