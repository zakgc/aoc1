let safe = []

function createSafe() {
    for (let i = 0; i < 100; i++) {
       safe.push(i)
    }
}

function runSafeCrack() {
    createSafe()
    console.log(safe)
}

runSafeCrack()