/* Módulo com a lógica do carrossel, é possível usar essa classe com qualquer vetor com strings. */
class Carrossel {
    constructor(array) {
        this.imagens = array;
        this.indice = 0;
    }
    anterior() {
        this.indice === 0 ? this.indice = this.imagens.length - 1 : this.indice--;
        return this.indice;
    }
    proxima() {
        this.indice === this.imagens.length - 1 ? this.indice = 0 : this.indice++;
        return this.indice;
    }
}
export default Carrossel;
