import {MEMORY_SIZE} from './variables/MemoryConstants';

export class Memory{
    constructor(){
        this.memory = new Uint8Array(MEMORY_SIZE);
        this.resetMemory();
    }
    resetMemory(){
        this.memory.fill(0); //llenar memoria de 0s
    }
    
    setMemory(address, value){
        this.assertMemory(address);
        this.memory[address] = value;
    }

    getMemory(address){
        this.assertMemory(address);
        return this.memory[address];
    }

    assertMemory(address){
        console.assert(address >= 0 && address < MEMORY_SIZE, "Memoria fuera de rango " + address);
    }
}