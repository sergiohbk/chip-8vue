import {Display} from './Display.js';
import {Memory} from './Memory.js';
import { Registers } from './Registers.js';
import { Keyboard } from './Keyboard.js';
import { SPRITE_GROUP } from './variables/SpriteGroupConstants.js';
import { LOAD_PROGRAM_ADDRESS_SIZE, MEMORY_SIZE, SPRITE_GROUP_ADDRESS } from './variables/MemoryConstants.js';
import { TIMER60HZ } from './variables/RegisterConstants.js';
import { SoundCard } from './SoundCard.js';
import { Disassembler } from './Disassembler.js';

export class Chip8{
    constructor(rombuffer){
        console.log("Chip8 constructor"); 
        this.memory = new Memory();
        this.registers = new Registers();
        this.keyboard = new Keyboard();
        this.loadSpriteGroup(this.memory);
        this.loadRom(rombuffer);
        this.display = new Display(this.memory.memory);
        this.soundcard = new SoundCard();
        this.disassembler = new Disassembler();
    }

    sleep(ms = TIMER60HZ){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    loadSpriteGroup(memory){
        memory.memory.set(SPRITE_GROUP, SPRITE_GROUP_ADDRESS);
    }
    loadRom(rombuffer){
        console.assert(rombuffer.length + LOAD_PROGRAM_ADDRESS_SIZE <= MEMORY_SIZE, "la ROM es muy grande");
        this.memory.memory.set(rombuffer, LOAD_PROGRAM_ADDRESS_SIZE);
        this.registers.PC = LOAD_PROGRAM_ADDRESS_SIZE;
    }
    execute(opcode){
        const {instruction, args} = this.disassembler.dissasemble(opcode);
        switch(instruction.id) {
            default:
                console.error("Instruccion no reconocida", instruction, args);
                break;
            case 'CLS':
                this.display.resetPixels();
                //limpia la pantalla, sin mas
                break;
            case 'RET':
                this.registers.PC = this.registers.removeToStack();
                //pasamos la ejecucion la PC y la borramos del stack, porque ya se estaria ejecutando
                break;
            case 'JP_ADDR':
                this.registers.PC = args[0];
                //cambiamos la PC por el valor indicado
                break;
            case 'CALL_ADDR':
                this.registers.addToStack(this.registers.PC);
                this.registers.PC = args[0];
                //añadimos la PC al stack, y cambiamos la PC por el valor indicado
                break;
            case 'SE_Vx_byte':
                if(this.registers.V[args[0]] === args[1]){
                    this.registers.PC += 2;
                }
                //si el valor de la variable Vx es igual al byte indicado, añadimos 2 al PC
                break;
            case 'SNE_Vx_byte':
                if(this.registers.V[args[0]] !== args[1]){
                    this.registers.PC += 2;
                }
                //si el valor de la variable Vx es diferente al byte indicado, añadimos 2 al PC
                break;
            case 'SE_Vx_Vy':
                if(this.registers.V[args[0]] === this.registers.V[args[1]]){
                    this.registers.PC += 2;
                }
                //si el valor de la variable Vx es igual al valor de la variable Vy, añadimos 2 al PC
                break;
            case 'LD_Vx_byte':
                this.registers.V[args[0]] = args[1];
                //cambiamos el valor de la variable Vx por el byte indicado
                break;
        }
    }

    logs(){
        console.log(this.memory.memory);
        console.log(this.registers.PC.toString(16));
        console.log(this.memory.getOpcode(this.registers.PC).toString(16));
    }
}