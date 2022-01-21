export const MASK_NNN = {mask: 0x0FFF};
export const MASK_VX = {mask: 0x0F00, shift: 8};
export const MASK_KK = {mask: 0x00FF};
export const MASK_VY = {mask: 0x00F0, shift: 4};
export const MASK_N = {mask: 0x000F};

export const INSTRUCTION_SET = [
    {
        key: 2,
        id: 'CLS',
        name: 'CLS',
        description: 'Limpia la pantalla.',
        mask: 0xFFFF,
        pattern: 0x00E0,
    },
    {
        key: 3,
        id: 'RET',
        name: 'RET',
        description: '',
        mask: 0xFFFF,
        pattern: 0x00EE,
    },
    {
        key: 4,
        id: 'JP_ADDR',
        name: 'jump address',
        description: 'salta a la direccion indicada en los 12 bits siguientes, se igualan esos al PC',
        mask: 0xF000,
        pattern: 0x1000,
        arguments:[
            MASK_NNN
        ]
    },
    {
        key: 5,
        id: 'CALL_ADDR',
        name: 'call address',
        description: 'incrementa el SP, añade el PC arriba de la pila, el parametro se añade al PC',
        mask: 0xF000,
        pattern: 0x2000,
        arguments:[
            MASK_NNN
        ]
    },
    {
        key: 6,
        id: 'SE_Vx_byte',
        name: 'SE Vx, byte',
        description: 'Si Vx es igual al byte indicado incrementa el PC en 2',
        mask: 0xF000,
        pattern: 0x3000,
        arguments:[
            MASK_VX,
            MASK_KK
        ]
    },
    {
        key: 7,
        id: 'SNE_Vx_byte',
        name: 'SNE Vx, byte',
        description: 'Si Vx es diferente al byte indicado incrementa el PC en 2',
        mask: 0xF000,
        pattern: 0x4000,
        arguments:[
            MASK_VX,
            MASK_KK
        ]
    },
    {
        key: 8,	
        id: 'SE_Vx_Vy',
        name: 'SE Vx, Vy',
        description: 'Si Vx es igual a Vy incrementa el PC en 2',
        mask: 0xF00F,
        pattern: 0x5000,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 9,
        id: 'LD_Vx_byte',
        name: 'LD Vx, byte',
        description: 'Vx = byte',
        mask: 0xF000,
        pattern: 0x6000,
        arguments:[
            MASK_VX,
            MASK_KK
        ]
    },
    {
        key: 10,
        id: 'ADD_Vx_byte',
        name: 'ADD Vx, byte',
        description: 'Vx = Vx + byte',
        mask: 0xF000,
        pattern: 0x7000,
        arguments:[
            MASK_VX,
            MASK_KK
        ]
    },
    {
        key: 11,
        id: 'LD_Vx_Vy',
        name: 'LD Vx, Vy',
        description: 'Vx = Vy',
        mask: 0xF00F,
        pattern: 0x8000,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 12,
        id: 'OR_Vx_Vy',
        name: 'OR Vx, Vy',
        description: 'Vx = Vx OR Vy',
        mask: 0xF00F,
        pattern: 0x8001,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 13,
        id: 'AND_Vx_Vy',
        name: 'AND Vx, Vy',
        description: 'Vx = Vx AND Vy',
        mask: 0xF00F,
        pattern: 0x8002,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 14,
        id: 'XOR_Vx_Vy',
        name: 'XOR Vx, Vy',
        description: 'Vx = Vx XOR Vy',
        mask: 0xF00F,
        pattern: 0x8003,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 15,
        id: 'ADD_Vx_Vy',
        name: 'ADD Vx, Vy',
        description: 'El valor de Vx y Vy se suman y se guarda en Vx si es mayor que 8 bits VF es 1, si no es 0, solo los 8 bits se guardan en Vx',
        mask: 0xF00F,
        pattern: 0x8004,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 16,
        id: 'SUB_Vx_Vy',
        name: 'SUB Vx, Vy',
        description: 'Si Vx es mayor que Vy VF = 1, si no es mayor o igual a VF = 0 y Vx = Vx - Vy',
        mask: 0xF00F,
        pattern: 0x8005,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 17,
        id: 'SHR_Vx',
        name: 'SHR Vx',
        description: 'Si el ultimo bit significante de Vx es 1, VF = 1, si no es 0 y Vx = Vx / 2',
        mask: 0xF00F,
        pattern: 0x8006,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 18,
        id: 'SUBN_Vx_Vy',
        name: 'SUBN Vx, Vy',
        description: 'Si Vy es mayor que Vx VF = 1, si no es mayor o igual VF = 0 y Vx = Vy - Vx',
        mask: 0xF00F,
        pattern: 0x8007,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 19,
        id: 'SHL_Vx',
        name: 'SHL Vx',
        description: 'Si el primer bit de Vx es 1, VF = 1, si no es 0 y Vx = Vx * 2',
        mask: 0xF00F,
        pattern: 0x800E,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 20,
        id: 'SNE_Vx_Vy',
        name: 'SNE Vx, Vy',
        description: 'Si Vx es diferente a Vy incrementa el PC en 2',
        mask: 0xF00F,
        pattern: 0x9000,
        arguments:[
            MASK_VX,
            MASK_VY
        ]
    },
    {
        key: 21,
        id: 'LD_I_addr',
        name: 'LD I, 12 bits',
        description: 'I = ultimos 12 bits',
        mask: 0xF000,
        pattern: 0xA000,
        arguments:[
            MASK_NNN
        ]
    },
    {
        key: 22,
        id: 'JP_V0_addr',
        name: 'JP V0, 12 bits',
        description: 'PC = V0 + ultimos 12 bits',
        mask: 0xF000,
        pattern: 0xB000,
        arguments:[
            MASK_NNN
        ]
    },
    {
        key: 23,
        id: 'RND_Vx_byte',
        name: 'RND Vx, byte',
        description: 'genera un byte random y se hace la operacion AND con el byte KK, el resultado se guarda en Vx',
        mask: 0xF000,
        pattern: 0xC000,
        arguments:[
            MASK_VX,
            MASK_KK
        ]
    },
    {
        key: 24,
        id: 'DRW_Vx_Vy_nibble',
        name: 'DRW Vx, Vy, nibble',
        description: 'muestra el sprite n4bits en la posicion Vx, Vy, los sprites se ejecutan un XOR, si un pixel es borrado VF = 1 si no es 0, si se pasa del tamaño de pantalla, se añadira en la otra parte de la pantalla',
        mask: 0xF000,
        pattern: 0xD000,
        arguments:[
            MASK_VX,
            MASK_VY,
            MASK_N
        ]
    },
    {
        key: 25,
        id: 'SKP_Vx',
        name: 'SKP Vx',
        description: 'si el valor de Vx es igual a la tecla presionada incrementa el PC en 2',
        mask: 0xF0FF,
        pattern: 0xE09E,
        arguments:[
            MASK_VX
        ]
    },
    {
        key: 26,
        id: 'SKNP_Vx',
        name: 'SKNP Vx',
        description: 'si no esta presionada la tecla con el valor de Vx incrementa el PC en 2',
        mask: 0xF0FF,
        pattern: 0xE0A1,
        arguments:[
            MASK_VX
        ]
    },
    {
        key: 27,
        id: 'LD_Vx_DT',
        name: 'LD Vx, DT',
        description: 'Vx = DT',
        mask: 0xF0FF,
        pattern: 0xF007,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:28,
        id: 'LD_Vx_K',
        name: 'LD Vx, K',
        description: 'Espera a que se pulse una tecla y la guarda en Vx',
        mask: 0xF0FF,
        pattern: 0xF00A,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:29,
        id: 'LD_DT_Vx',
        name: 'LD DT, Vx',
        description: 'DT = Vx',
        mask: 0xF0FF,
        pattern: 0xF015,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:30,
        id: 'LD_ST_Vx',
        name: 'LD ST, Vx',
        description: 'ST = Vx',
        mask: 0xF0FF,
        pattern: 0xF018,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:31,
        id: 'ADD_I_Vx',
        name: 'ADD I, Vx',
        description: 'I = I + Vx',
        mask: 0xF0FF,
        pattern: 0xF01E,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:32,
        id: 'LD_F_Vx',
        name: 'LD F, Vx',
        description: 'I = localizacion del sprite en Vx',
        mask: 0xF0FF,
        pattern: 0xF029,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:33,
        id: 'LD_B_Vx',
        name: 'LD B, Vx',
        description: 'Vx se lee en decimal, se coge la centena y se añade en la posicion I, se lee la decena y se añade en la posicion I+1, se lee el unidad y se añade en la posicion I+2',
        mask: 0xF0FF,
        pattern: 0xF033,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:34,
        id: 'LD_I_Vx',
        name: 'LD I, Vx',
        description: 'I = I + Vx',
        mask: 0xF0FF,
        pattern: 0xF055,
        arguments:[
            MASK_VX
        ]
    },
    {
        key:35,
        id: 'LD_Vx_I',
        name: 'LD Vx, I',
        description: 'Vx = I',
        mask: 0xF0FF,
        pattern: 0xF065,
        arguments:[
            MASK_VX
        ]
    }
];