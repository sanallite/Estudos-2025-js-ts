class Cronometro {
    private milesimos: number;
    private segundos: number;
    private minutos: number;
    private pausado: boolean;
    private intervalo: number;

    constructor() {
       this.milesimos = 0;
       this.segundos = 0;
       this.minutos = 0;
       this.pausado = true;
    }

    public contar(elemento: HTMLParagraphElement) {
        this.pausado = false;

        this.intervalo = setInterval(() => {
            this.milesimos += 100;
            /* Incrementando por centésimos */

            if ( this.milesimos >= 1000 ) {
                this.milesimos = 0;
                this.segundos++;
            }

            if (this.segundos >= 60) {
                this.segundos = 0;
                this.minutos++
            }

            elemento.textContent = `${String(this.minutos).padStart(2, '0')} minutos, ${String(this.segundos).padStart(2, '0')} segundos, ${String(this.milesimos).padStart(3, '0')} milésimos.`
        }, 100)
    }

    public pausar() {
       this.pausado = true;
       clearInterval(this.intervalo);
    }

    public restaurar(elemento: HTMLParagraphElement) {
        this.pausar();
        this.milesimos = 0;
        this.segundos = 0;
        this.minutos = 0;
        elemento.textContent = '';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const botaoComecar = <HTMLButtonElement>document.querySelector('button.c');
    const botaoParar = <HTMLButtonElement>document.querySelector('button.p');
    const botaoRestaurar = <HTMLButtonElement>document.querySelector('button.r');

    const exibicao = <HTMLParagraphElement>document.querySelector('p.exibicao');

    const cronometro = new Cronometro();

    const desativarBotao = (elemento: HTMLButtonElement) => elemento.setAttribute('disabled', 'true');
    const ativarBotao = (elemento: HTMLButtonElement) => elemento.removeAttribute('disabled');

    botaoComecar!.addEventListener('click', () => {
        cronometro.contar(exibicao);
        ativarBotao(botaoParar);
        ativarBotao(botaoRestaurar);
        desativarBotao(botaoComecar);
    });

    botaoParar!.addEventListener('click', () => {
        cronometro.pausar();
        ativarBotao(botaoComecar);
        desativarBotao(botaoParar);
    });

    botaoRestaurar!.addEventListener('click', () => {
        cronometro.restaurar(exibicao);
        ativarBotao(botaoComecar);
        desativarBotao(botaoParar);
        desativarBotao(botaoRestaurar);
    })
})