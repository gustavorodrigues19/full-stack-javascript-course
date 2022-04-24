// Função em JS é First-Class Object (Citizens)
// Higher-order function

// criar de forma literal
function fun1() {}

// Armazenar em uma variavel
const fun2 = function () {}

// Armazenar
const obj = {}
obj.falar = function () {
    return 'Opa'
}

// Passar funcao como param
function run(fun) {
    fun()
}

run(function () {
    console.log('Executando...')
})

function soma(a, b) {
    return function (c) {
        console.log(a + b + c)
    }
}

soma(2, 3)(4)
const cincoMais = soma(2, 3)
cincoMais(4)
