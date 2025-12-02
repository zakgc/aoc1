var fs = require('fs');

let safe = []
let instructionsArr = []

function createSafe() {
    for (let i = 0; i < 100; i++) {
       safe.push(i)
    }
}

function formatInstructions(instructions) {
    instructions.forEach(instruction => {
        let direction = instruction[0]
        let amount = parseInt(instruction.substring(1))
    
        instructionsArr.push({
            direction,
            amount
        })
    })
}

function rotateDial(pointer, rotation) {
    let direction = rotation[0]
    let amount = (parseInt(rotation.substring(1)) % 100)
    let newpointer = 0

    if (direction === 'R') {
        let move = pointer + amount

        if (move >= 100) {
            move -= 100
            move = move % 100
        }

        newpointer = safe[move]
    } else if (direction === 'L') {
        let move = pointer - amount

        if (move < 0) {
            move += 100
            move = Math.abs(move % -100)
        }

        newpointer = safe[move]
    }

    let amountZero = 0
    if (newpointer === 0) {
        amountZero ++
    }

    return {
        newpointer,
        amountZero
    }
}

function runSafeCrack(instructions) {
    createSafe()
    formatInstructions(instructions)

    let status = {
        pointer: 50,
        amountZero: 0
    }

    instructions.forEach(instruction => {
        let result = rotateDial(status.pointer, instruction)
        status.amountZero += result.amountZero
        status.pointer = result.newpointer
    })
    
    console.log(status.amountZero);
}

let instructionsTxt = fs.readFileSync('./instructions.txt', 'utf-8').replaceAll('\r', '')
let instructions = instructionsTxt.split('\n')

runSafeCrack(instructions)