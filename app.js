// Modificando h1 e p
// let titulo = document.querySelector('h1')
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// criar função de exibir texto na tela e adicionar som ao executar no site.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 50');
}

exibirMensagemInicial();

// Função em JS com comparações -> if e else.
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : `tentativa`;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

// função que gera número aleatório e armazena na lista para que não gere o mesmo número repetidamente.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadesElementosLista = listaNumerosSorteados.length;

    if (quantidadesElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

// função que limpa o campo após o usuário errar a tentativa
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// função que dá vida ao botão de reiniciar o jogo e que faz os números gerarem aleatoriamente para um novo jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

