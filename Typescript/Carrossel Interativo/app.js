/* Módulo que lida com os elementos */
import imagens from "./images.js";
import Carrossel from "./class.js";
const botaoPlay = document.querySelector('button.play');
const botaoPause = document.querySelector('button.pause');
const botaoAnterior = document.querySelector('button.anterior');
const botaoProxima = document.querySelector('button.proxima');
const containerImg = document.querySelector('div.imagem');
const imagem = containerImg.querySelector('img');
const carrossel = new Carrossel(imagens);
let indiceImg = 0;
const imagemAnterior = () => {
    indiceImg = carrossel.anterior();
    imagem.setAttribute('src', imagens[indiceImg]);
};
botaoAnterior.addEventListener('click', imagemAnterior);
