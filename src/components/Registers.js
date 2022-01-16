import { LOAD_PROGRAM_ADDRESS_SIZE } from "./variables/MemoryConstants";
import { NUMBER_OF_REGISTERS, STACK_PROFUNDIDAD } from "./variables/RegisterConstants";

export class Registers{
    constructor(){
        this.V = new Uint8Array(NUMBER_OF_REGISTERS); //el ultimo byte es una flag
        this.I = 0; //2 bytes
        this.DT = 0; //1 byte
        this.ST = 0; //1 byte
        this.PC = LOAD_PROGRAM_ADDRESS_SIZE; //program counter 2 bytes
        this.SP = -1; //stack pointer 1 byte
        this.stack = new Uint16Array(STACK_PROFUNDIDAD); //stack de 32 bytes
        this.resetRegisters();
    }
    resetRegisters(){
        this.V.fill(0);
        this.I = 0;
        this.delaytimer = 0;
        this.soundtimer = 0;
        this.PC = LOAD_PROGRAM_ADDRESS_SIZE;
        this.SP = -1; //apunta a menos uno porque el stack empieza en 0 y se añade el ++
        this.stack.fill(0);
    }

    addToStack(value){
        //añadir a la pila de procesos
        this.SP++;
        this.assertStackOverflow();
        this.stack[this.SP] = value;
    }
    removeToStack(){
        //sacar de la pila de procesos
        const value = this.stack[this.SP];
        this.SP--;
        this.assertStackUnderflow();
        return value;
    }

    assertStackUnderflow(){
        console.assert(this.SP >= -1, "Desbordamiento de pila " + this.SP);
    }

    assertStackOverflow(){
        console.assert(this.SP < STACK_PROFUNDIDAD, "Desbordamiento de pila " + this.SP);
    }
}