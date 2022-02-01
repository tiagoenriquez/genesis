var ordemSorteada = [];
var ordemClicada = [];
var pontuacao = 0;
var piscando = false;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

const qtdCores = 4;

/**
 * Retorna o elemento de determinado número.
 * @param {Number} numeroDaCor 
 * @returns Element
 */
function obterCorDeNumero(numeroDaCor) {
    console.log(`Obtendo cor de número ${numeroDaCor}`);
    switch (parseInt(numeroDaCor)) {
        case 0:
            console.log(green);
            return green;
        case 1:
            console.log(red);
            return red;
        case 2:
            console.log(yellow);
            return yellow;
        case 3:
            console.log(blue);
            return blue;
    }
}

/**
 * Verifica se o usuário clicou na cor correta.
 * @param {number} posicao
 * @returns boolean
 */
function acertarOrdem(posicao) {
    console.log(`Checando ${posicao}`);
    if (ordemSorteada[posicao] !== ordemClicada[posicao]) {
        return false;
    }
    return true;
}

/**
 * Atribui às variáveis os valores iniciais.
 */
function resetar() {
    console.log("Resetando");
    ordemSorteada = [];
    ordemClicada = [];
    pontuacao = 0;
    for (let i = 0; i < qtdCores; i++) {
        let cor = obterCorDeNumero(i);
        cor.classList.remove('selected');
    }
}

/**
 * Faz a cor referente a um determinado número piscar na tela.
 * @param {number} numeroDaCor
 * @returns Promise
 */
function piscar(numeroDaCor) {
    let cor = obterCorDeNumero(numeroDaCor);
    setTimeout(() => {
        console.log(`Piscando ${numeroDaCor}`);
        cor.classList.add('selected');
    }, 500);
    setTimeout(() => {
        cor.classList.remove('selected');
        console.log(`Terminando de piscar ${numeroDaCor}`);
    }, 1000);
}

/**
 * Sorteia a última cor da lista de cores sorteateas.
 */
function sortear() {
    console.log("Sorteando");
    let numeroDaCorSorteada = Math.floor(Math.random() * 4);
    ordemSorteada.push(numeroDaCorSorteada);
    ordemClicada = [];
}

/**
 * Mostra a ordem das cores sorteadas.
 */
function mostrarCoresSorteadas() {
    console.log("Mostrando cores sorteadas");
    for (let i = 0; i < ordemSorteada.length; i++) {
        piscar(ordemSorteada[i]);
    }
}

/**
 * Executa funções decorrentes do clique em determinada cor.
 * @param {number} numeroDaCor 
 */
function clicar(numeroDaCor) {
    console.log(`Recebendo clique em ${numeroDaCor}`);
    ordemClicada.push(numeroDaCor);
    let acerto = acertarOrdem(ordemClicada.length - 1);
    if (acerto) {
        pontuacao++;
        if (ordemSorteada.length === ordemClicada.length) {
            sortear();
            mostrarCoresSorteadas();
        }
    } else {
        alert(`Fim do jogo!\nVocê errou!\nPontuação: ${pontuacao}`);
        iniciar();
    }
}

/**
 * Inicia o jogo.
 */
function iniciar() {
    alert('Bem vindo ao Gênesis! Iniciando o jogo.');
    resetar();
    sortear();
    mostrarCoresSorteadas();
}

green.onclick = () => clicar(0);
red.onclick = () => clicar(1);
yellow.onclick = () => clicar(2);
blue.onclick = () => clicar(3);

iniciar();