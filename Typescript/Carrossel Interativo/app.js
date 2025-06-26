/* Módulo que lida com os elementos */
import imagens from "./images.js";
import Carrossel from "./class.js";
const botaoPlay = document.querySelector('button.play');
const botaoPause = document.querySelector('button.pause');
const botaoAnterior = document.querySelector('button.anterior');
const botaoProxima = document.querySelector('button.proxima');
const containerImg = document.querySelector('div.imagem');
const imagem = containerImg.querySelector('img');
const estadoCarrossel = containerImg.querySelector('div p');
const carrossel = new Carrossel(imagens);
let indiceImg = 0;
let intervalo;
const iniciarCarrossel = () => {
    if (intervalo) {
        console.log('Já inciado');
    }
    else {
        intervalo = setInterval(() => {
            indiceImg = carrossel.proxima();
            imagem.setAttribute('src', imagens[indiceImg]);
        }, 5000);
        botaoPlay.setAttribute('disabled', 'true');
        botaoPause.removeAttribute('disabled');
        estadoCarrossel.textContent = 'Exibição Automática';
    }
};
const pausarCarrossel = () => {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = undefined;
        botaoPlay.removeAttribute('disabled');
        botaoPause.setAttribute('disabled', 'true');
        estadoCarrossel.textContent = '';
    }
    else {
        console.log('Sem intervalo');
    }
};
const imagemAnterior = () => {
    indiceImg = carrossel.anterior();
    imagem.setAttribute('src', imagens[indiceImg]);
};
const proximaImagem = () => {
    indiceImg = carrossel.proxima();
    imagem.setAttribute('src', imagens[indiceImg]);
};
imagem.setAttribute('src', imagens[indiceImg]);
botaoPlay.addEventListener('click', iniciarCarrossel);
botaoPause.addEventListener('click', pausarCarrossel);
botaoAnterior.addEventListener('click', imagemAnterior);
botaoProxima.addEventListener('click', proximaImagem);
