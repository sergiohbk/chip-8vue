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
            {
                mask: 0x0FFF
            }
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
            {
                mask: 0x0FFF
            }
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
            {
                mask: 0x0F00,
                shift: 8
            },
            {
                mask: 0x00FF
            }
        ]
    },
];