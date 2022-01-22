import {Display} from './Display.js';
import {Memory} from './Memory.js';
import { Registers } from './Registers.js';
import { Keyboard } from './Keyboard.js';
import { SPRITE_GROUP } from './variables/SpriteGroupConstants.js';
import { LOAD_PROGRAM_ADDRESS_SIZE, MEMORY_SIZE, SPRITE_GROUP_ADDRESS } from './variables/MemoryConstants.js';
import { TIMER60HZ } from './variables/RegisterConstants.js';
import { SoundCard } from './SoundCard.js';
import { Disassembler } from './Disassembler.js';
import { SPRITE_HEIGHT_DEFAULT } from './variables/DisplayConstants.js';

export class Chip8{
    constructor(rombuffer){
        console.log("Chip8 constructor"); 
        this.memory = new Memory();
        this.registers = new Registers();
        this.keyboard = new Keyboard();
        this.loadSpriteGroup(this.memory);
        this.rombuffer = rombuffer;
        this.loadRom(this.rombuffer);
        this.display = new Display(this.memory.memory);
        this.soundcard = new SoundCard();
        this.disassembler = new Disassembler();
        this.running = false;
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
    run(){
        if(this.memory.memory[this.registers.PC] !== undefined){
            this.opcodehigh = this.memory.memory[this.registers.PC] << 8;
            this.opcodelow = this.memory.memory[this.registers.PC + 1];
            this.opcode = this.opcodehigh | this.opcodelow;
            if(this.opcode == 0){
                this.running = false;
                console.log(this.memory.memory[0x314].toString(16) + " " + (this.memory.memory[0x314] + 1).toString(16));
                return;
            }
            console.log("opcode: " + this.opcode.toString(16));
            this.execute(this.opcode);
        }else{
            this.running = false;
        }
    }

    continuePC(PC){
        this.registers.PC += PC;
    }
    async execute(opcode){
        const {instruction, args} = this.disassembler.dissasemble(opcode);
        switch(instruction.id) {
            default:
                console.error("Instruccion no reconocida", instruction, args);
                this.continuePC(2);
                break;
            case 'CLS':
                this.display.resetPixels();
                //limpia la pantalla, sin mas
                this.continuePC(2);
                break;
            case 'RET':
                this.registers.PC = this.registers.removeToStack();
                this.continuePC(2);
                //pasamos la ejecucion PC y la borramos del stack, porque ya se estaria ejecutando
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
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }
                //si el valor de la variable Vx es igual al byte indicado, añadimos 2 al PC
                break;
            case 'SNE_Vx_byte':
                if(this.registers.V[args[0]] !== args[1]){
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }

                //si el valor de la variable Vx es diferente al byte indicado, añadimos 2 al PC
                break;
            case 'SE_Vx_Vy':
                if(this.registers.V[args[0]] === this.registers.V[args[1]]){
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }
                //si el valor de la variable Vx es igual al valor de la variable Vy, añadimos 2 al PC
                break;
            case 'LD_Vx_byte':
                this.registers.V[args[0]] = args[1];
                this.continuePC(2);
                //cambiamos el valor de la variable Vx por el byte indicado
                break;
            case 'ADD_Vx_byte':
                this.registers.V[args[0]] += args[1];
                this.continuePC(2);
                //añadimos el byte indicado a la variable Vx
                break;
            case 'LD_Vx_Vy':
                this.registers.V[args[0]] = this.registers.V[args[1]];
                this.continuePC(2);
                //cambiamos el valor de la variable Vx por el valor de la variable Vy
                break;
            case 'OR_Vx_Vy':
                this.registers.V[args[0]] |= this.registers.V[args[1]];
                this.continuePC(2);
                //hacemos un OR entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx
                break;
            case 'AND_Vx_Vy':
                this.registers.V[args[0]] &= this.registers.V[args[1]];
                this.continuePC(2);
                //hacemos un AND entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx
                break;
            case 'XOR_Vx_Vy':
                this.registers.V[args[0]] ^= this.registers.V[args[1]];
                this.continuePC(2);
                //hacemos un XOR entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx
                break;
            case 'ADD_Vx_Vy':{
                let sum = this.registers.V[args[0]] + this.registers.V[args[1]];
                this.registers.V[0xF] = sum > 0xFF ? 1 : 0; //comparamos si la suma es mayor que 255, si es asi, guardamos 1 en la variable VF
                this.registers.V[args[0]] = sum & 0xFF; //hacemos un AND para obtener los ultimos 8 bits de la suma
                //hacemos una suma entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx damos valor a VF segun sea el caso 
                this.continuePC(2);
                break;
            }
            case 'SUB_Vx_Vy':{
                let sub = this.registers.V[args[0]] - this.registers.V[args[1]];
                this.registers.V[0xF] = sub < 0 ? 0 : 1; //comparamos si la resta es menor que 0, si es asi, guardamos 0 en la variable VF
                this.registers.V[args[0]] = sub & 0xFF; //hacemos un AND para obtener los ultimos 8 bits de la resta
                //hacemos una resta entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx damos valor a VF segun sea el caso
                this.continuePC(2);
                break;
            }
            case 'SHR_Vx':{
                this.registers.V[0xF] = this.registers.V[args[0]] & 0x1; //guardamos el bit menos significativo en la variable VF
                this.registers.V[args[0]] >>= 1; //hacemos un shift right (igual a dividir entre 2) entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx
                this.continuePC(2);
                break;
            }
            case 'SUBN_Vx_Vy':{
                let sub = this.registers.V[args[1]] - this.registers.V[args[0]];
                this.registers.V[0xF] = sub < 0 ? 0 : 1; //comparamos si la resta es menor que 0, si es asi, guardamos 0 en la variable VF
                this.registers.V[args[0]] = sub & 0xFF; //hacemos un AND para obtener los ultimos 8 bits de la resta
                //hacemos una resta entre los valores de las variables Vy y Vx y lo guardamos en la variable Vx damos valor a VF segun sea el caso
                this.continuePC(2);
                break;
            }
            case 'SHL_Vx':{
                this.registers.V[0xF] = this.registers.V[args[0]] & 0x80; //guardamos el bit mas significativo en la variable VF
                this.registers.V[args[0]] <<= 1; //hacemos un shift left (igual a multiplicar por 2) entre los valores de las variables Vx y Vy y lo guardamos en la variable Vx
                this.continuePC(2);
                break;
            }
            case 'SNE_Vx_Vy':
                if(this.registers.V[args[0]] !== this.registers.V[args[1]]){
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }
                //si el valor de la variable Vx es diferente al valor de la variable Vy, añadimos 2 al PC
                
                break;
            case 'LD_I_addr':
                this.registers.I = args[0];
                this.continuePC(2);
                //cambiamos el valor de la variable I por el byte indicado
                break;
            case 'JP_V0_addr':
                this.registers.PC = args[0] + this.registers.V[0];
                //cambiamos el valor de la variable PC por el byte indicado mas el valor de la variable V0
                break;
            case 'RND_Vx_byte':
                this.registers.V[args[0]] = Math.floor(Math.random() * 0xFF) & args[1];
                //cambiamos el valor de la variable Vx por un byte aleatorio entre 0 y 255 y se suma por el byte KK
                this.continuePC(2);
                break;
            case 'DRW_Vx_Vy_nibble':{
                this.registers.V[0xF] = this.display.drawSprite(
                    this.registers.V[args[0]], 
                    this.registers.V[args[1]], 
                    this.registers.I, 
                    args[2]
                );
                this.continuePC(2);
                break;
                //dibujamos un pixel en la posicion indicada por Vx, Vy en la posicion del registro I y el largo indicado en N        
            }
            case 'SKP_Vx':
                if(this.keyboard.iskeyDown(this.registers.V[args[0]])){
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }
                //si la tecla indicada en Vx esta pulsada, añadimos 2 al PC
                break;
            case 'SKNP_Vx':
                if(!this.keyboard.iskeyDown(this.registers.V[args[0]])){
                    this.continuePC(4);
                }else{
                    this.continuePC(2);
                }
                //si la tecla indicada en Vx no esta pulsada, añadimos 2 al PC
                break;
            case 'LD_Vx_DT':
                this.registers.V[args[0]] = this.registers.DT;
                //cambiamos el valor de la variable Vx por el valor de DT
                this.continuePC(2);
                break;
            case 'LD_Vx_K':{
                let keypressed = this.keyboard.haskeyDown();
                while(keypressed === -1){
                    await this.sleep();
                    keypressed = this.keyboard.haskeyDown();
                }
                this.registers.V[args[0]] = keypressed;
                //cambiamos el valor de la variable Vx por el valor de la tecla pulsada, esperamos con un loop a que se pulse una tecla
                this.continuePC(2);
                break;
            }
            case 'LD_DT_Vx':
                this.registers.DT = this.registers.V[args[0]];
                //cambiamos el valor de DT por el valor de la variable Vx
                this.continuePC(2);
                break;
            case 'LD_ST_Vx':
                this.registers.ST = this.registers.V[args[0]];
                //cambiamos el valor de ST por el valor de la variable Vx
                this.continuePC(2);
                break;
            case 'ADD_I_Vx':
                this.registers.I += this.registers.V[args[0]];
                //cambiamos el valor de I por el valor de la variable Vx mas el valor de I
                this.continuePC(2);
                break;
            case 'LD_F_Vx':
                this.registers.I = this.registers.V[args[0]] * SPRITE_HEIGHT_DEFAULT;
                //cambiamos el valor de I por el valor de la variable Vx multiplicado por 5
                this.continuePC(2);
                break;
            case 'LD_B_Vx':{
                let x = this.registers.V[args[0]];
                const cientos = Math.floor(x / 100);
                const decenas = Math.floor(x/10 % 10);
                const unidades = Math.floor(x % 10);
                this.memory.memory[this.registers.I] = cientos;
                this.memory.memory[this.registers.I + 1] = decenas;
                this.memory.memory[this.registers.I + 2] = unidades;
                //guardamos en memoria el valor de vx en i, i+1 y i+2 cogiendo la variable vx y dividiendola entre centenas, decenas y unidades
                this.continuePC(2);
                break;
            }
            case 'LD_I_Vx':{
                for(let i = 0; i <= args[0]; i++){
                    this.memory.memory[this.registers.I + i] = this.registers.V[i];
                }
                this.registers.I += args[0] + 1;
                //guardamos en memoria el valor de V0 hasta Vx en la posicion de I
                this.continuePC(2);
                break;
            }
            case 'LD_Vx_I':{
                for(let i = 0; i <= args[0]; i++){
                    this.registers.V[i] = this.memory.memory[this.registers.I + i];
                }
                this.registers.I += args[0] + 1;
                //guardamos en V0 hasta Vx la posicion de I en memoria
                this.continuePC(2);
                break;
            }
        }
    }
}