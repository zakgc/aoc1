var fs = require('fs');

let safe = []

function createSafe() {
    for (let i = 0; i < 100; i++) {
       safe.push(i)
    }
}

function rotateDial(pointer, rotation) {
    let direction = rotation[0]
    let amount = parseInt(rotation.substring(1))
    let newpointer = 0

    if (direction === 'R') {
        let move = pointer + amount
        if (move >= 100) {
            move -= 100
        }

        newpointer = safe[move]
    } else if (direction === 'L') {
        let move = pointer - amount
        if (move < 0) {
            move += 100
        }

        newpointer = safe[move]
    }

    wasZero = newpointer === 0

    return {
        newpointer,
        wasZero
    }
}

function runSafeCrack(instructions) {
    createSafe()

    let status = {
        pointer: 50,
        wasZero: false
    }
    let results = 0

    instructions.forEach(instruction => {
        let result = rotateDial(status.pointer, instruction)
        if (result.wasZero === true) {
            results ++
        }
        status.pointer = result.newpointer
    })
    
    console.log(results);
}

let instructionsTxt = fs.readFileSync('./instructions.txt', 'utf-8').replaceAll('\r', '')
let instructions = instructionsTxt.split('\n')

runSafeCrack(instructions)