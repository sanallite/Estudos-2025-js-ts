/* Módulo que lida com os elementos */

import imagens from "./images.js";
import Carrossel from "./class.js";

const botaoPlay = document.querySelector('button.play') as HTMLButtonElement;
const botaoPause = document.querySelector('button.pause') as HTMLButtonElement;
const botaoAnterior = document.querySelector('button.anterior') as HTMLButtonElement;
const botaoProxima = document.querySelector('button.proxima') as HTMLButtonElement;

const containerImg = document.querySelector('div.imagem') as HTMLDivElement;
const imagem = containerImg.querySelector('img');

const carrossel = new Carrossel(imagens);

let indiceImg: number = 0;

const imagemAnterior = () => {
    indiceImg = carrossel.anterior();
    imagem!.setAttribute('src', imagens[indiceImg])
}

botaoAnterior.addEventListener('click', imagemAnterior);