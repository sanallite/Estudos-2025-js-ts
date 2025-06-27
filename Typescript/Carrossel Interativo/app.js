/* Módulo que lida com os elementos */
import imagens from "./images.js";
import Carrossel from "./class.js";
/* O array com as imagens e a classe */
const botaoPlay = document.querySelector('button.play');
const botaoPause = document.querySelector('button.pause');
const botaoAnterior = document.querySelector('button.anterior');
const botaoProxima = document.querySelector('button.proxima');
const containerImg = document.querySelector('div.imagem');
const imagem = containerImg.querySelector('img');
const estadoCarrossel = containerImg.querySelector('div p');
const linhaFrente = containerImg.querySelector('div.linhaFrente');
const carrossel = new Carrossel(imagens);
let indiceImg = 0;
let intervalo;
/* A função de callback do setInterval retorna um número que é o identificador do intervalo, e undefined é para quando não tem nenhum intervalo ativo. */
const iniciarCarrossel = () => {
    if (intervalo) {
        console.log('Já inciado');
    }
    else {
        intervalo = setInterval(() => {
            indiceImg = carrossel.proxima();
            /* Chamando o método que incrementa o índice. */
            imagem.setAttribute('src', imagens[indiceImg]);
            imagem.classList.add('fade-in');
            /* Classe para animação */
            setTimeout(() => {
                imagem.classList.remove('fade-in');
            }, 1000);
            atualizarBarraProgresso();
        }, 5000);
        botaoPlay.setAttribute('disabled', 'true');
        botaoPause.removeAttribute('disabled');
        estadoCarrossel.removeAttribute('hidden');
        estadoCarrossel.textContent = 'Exibição Automática';
    }
};
const pausarCarrossel = () => {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = undefined;
        botaoPlay.removeAttribute('disabled');
        botaoPause.setAttribute('disabled', 'true');
        estadoCarrossel.setAttribute('hidden', 'true');
    }
    else {
        console.log('Sem intervalo');
    }
};
const imagemAnterior = () => {
    indiceImg = carrossel.anterior();
    imagem.setAttribute('src', imagens[indiceImg]);
    imagem.classList.add('fade-in');
    setTimeout(() => {
        imagem.classList.remove('fade-in');
    }, 500);
    atualizarBarraProgresso();
};
const proximaImagem = () => {
    indiceImg = carrossel.proxima();
    imagem.setAttribute('src', imagens[indiceImg]);
    imagem.classList.add('fade-in');
    setTimeout(() => {
        imagem.classList.remove('fade-in');
    }, 500);
    atualizarBarraProgresso();
};
const atualizarBarraProgresso = () => {
    const item = indiceImg + 1;
    const porcentagem = (item / imagens.length) * 100;
    linhaFrente.style.width = `${porcentagem}%`;
    /* A porcentagem do item atual em relação ao tamanho do vetor dita a largura do elemento. */
};
/* Estado inicial da página */
imagem.setAttribute('src', imagens[indiceImg]);
atualizarBarraProgresso();
botaoPlay.addEventListener('click', iniciarCarrossel);
botaoPause.addEventListener('click', pausarCarrossel);
botaoAnterior.addEventListener('click', imagemAnterior);
botaoProxima.addEventListener('click', proximaImagem);
