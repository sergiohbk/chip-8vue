import { INSTRUCTION_SET } from "./variables/InstructionSet";

export class Disassembler{
    dissasemble(opcode){
        let args = [];
        let instruction = INSTRUCTION_SET.find(
            instruction => (opcode & instruction.mask) === instruction.pattern
        );
        if(instruction !== undefined){
            if(instruction.arguments){
                args = instruction.arguments.map(arg => (opcode & arg.mask) >> arg.shift);
            }
            console.log("La instruccion "+  instruction.name + " tiene el opcode " + opcode.toString(16));
            return {instruction, args};
        }else{
            instruction = {
                key: 0,
                id: '',
                name: '',
                description: '',
                mask: 0,
                pattern: 0,
                arguments: []
            };

            return {instruction, args};
        }  
    }
}