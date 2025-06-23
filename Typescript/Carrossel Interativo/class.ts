/* Módulo com a lógica do carrossel */

class Carrossel {
    imagens: string[]
    indice: number

    constructor(array: string[]) {
        this.imagens = array;
        this.indice = 0;
    }

    play() {

    }

    pause() {

    }

    anterior() {
        this.indice -= 1 || this.imagens.length - 1
        return this.indice
    }

    proxima() {

    }
}

export default Carrossel