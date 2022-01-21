import { INSTRUCTION_SET } from "./variables/InstructionSet";

export class Disassembler{
    dissasemble(opcode){
        let args = [];
        const instruction = INSTRUCTION_SET.find(
            instruction => (opcode & instruction.mask) === instruction.pattern
        );
        console.log("La instruccion "+  instruction.name + " tiene el opcode " + opcode.toString(16));
        if(instruction.arguments){
            args = instruction.arguments.map(arg => (opcode & arg.mask) >> arg.shift);
        }
        return {instruction, args};
    }
}