/* Script gerado pelo Claude adaptado por mim para TypeScript */
const carrossel = document.getElementById('carousel') as HTMLDivElement
const track = document.getElementById('track') as HTMLDivElement
const containerIndicadores = document.getElementById('indicators') as HTMLDivElement
const slides = document.getElementsByClassName('carousel-slide')

/* Estado do Carrossel */
let indexAtual: number = 0
const totalSlides: number = slides.length
const THRESHOLD: number = 50
/* Threshold mínimo, em píxels, para considerar um swipe válido. */

/* Estado do arrasto do ponteiro */
let isDragging: boolean = false
let startX: number = 0
let currentX: number = 0
let translateX: number = 0

/* Criando os indicadores */
for ( let i = 0; i < totalSlides; i++ ) {
    const indicador = document.createElement('div')
    indicador.className = 'indicator'

    if ( i === 0 ) {
        indicador.classList.add('active')
    }
    
    indicador.addEventListener('click', () => irParaSlide(i))
    containerIndicadores.appendChild(indicador)
}

/* Atualizar display de debug */
const updateDebug = (dados: {
    startX?: number,
    currentX?: number,
    displacement?: number,
    direction?: string,
    translateX: number
}) => {
    if ( dados.startX !== undefined ) {
        document.getElementById('startX')!.textContent = Math.round(dados.startX).toString()
    }

    if ( dados.currentX !== undefined ) {
        document.getElementById('currentX')!.textContent = Math.round(dados.currentX).toString()
    }
    
    if ( dados.direction !== undefined ) {
        document.getElementById('direction')!.textContent = dados.direction
    }

    if ( dados.displacement !== undefined ) {
        const disp: string = Math.round(dados.displacement).toString()
        document.getElementById('displacement')!.textContent = `${disp}px`
    }

    document.getElementById('translateX')!.textContent = dados.translateX.toString()
}

/* Evento: pointerdown. O início da interação */
carrossel.addEventListener('pointerdown', event => {
    isDragging = true
    startX = event.clientX
    currentX = event.clientX

    carrossel.classList.add('grabbing')
    carrossel.classList.add('dragging')

    updateDebug({
        startX: startX,
        currentX: currentX,
        direction: '-',
        displacement: 0,
        translateX: translateX
    })
})

/* Evento: pointermove. O movimento durante o arrasto. */
carrossel.addEventListener('pointermove', event => {
    if ( !isDragging ) return
    
    currentX = event.clientX
    const diferenca = currentX - startX
    const movimento = translateX + diferenca
    /* Exemplo indo do slide 2 para o 3: 
    translateX do slide 2 = -740, 
    diferenca = -219px, 
    movimento se torna = -959 e a direção vai para a esquerda. */

    /* Mover o track junto com o ponteiro */
    track.style.transform = `translateX(${movimento}px)`

    /* Determinar direção */
    let direcao: string
    diferenca > 0 ? direcao = '-> Direita' : diferenca < 0 ? direcao = '<- Esquerda' : direcao = '-'

    updateDebug({
        currentX: currentX,
        displacement: diferenca,
        direction: direcao,
        translateX: translateX
    })
})

/* Evento: pointerup. O fim da interação */
carrossel.addEventListener('pointerup', event => {
    if ( !isDragging ) return

    isDragging = false
    carrossel.classList.remove('grabbing')
    carrossel.classList.remove('dragging')

    const diferenca = currentX - startX

    /* Lógica da decisão: trocar slide ou voltar? */
    if ( Math.abs(diferenca) > THRESHOLD ) {
        if ( diferenca > 0 && indexAtual > 0 ) {
            indexAtual-- 
            /* Swipe para direita = slide anterior */
        }
        else if ( diferenca < 0 && indexAtual < totalSlides - 1 ) {
            indexAtual++
            /* Swipe para esquerda = próximo slide */
        }
    }

    irParaSlide(indexAtual)

    updateDebug({
        direction: Math.abs(diferenca) > THRESHOLD ?
        ( diferenca > 0 ? '✓ Anterior' : '✓ Próximo' ) :
        '✗ Sem mudança',
        translateX: translateX
    })
})

/* Evento: pointerleave. Cancelar se o ponteiro sair da área. */
carrossel.addEventListener('pointerleave', () => {
    if ( isDragging ) {
        isDragging = false
        carrossel.classList.remove('grabbing')
        carrossel.classList.remove('dragging')
        irParaSlide(indexAtual)
    }
})

/* Função de ir para um slide específico. */
const irParaSlide = (novoIndex: number) => {
    indexAtual = novoIndex
    translateX = -indexAtual * carrossel.offsetWidth
    /* Exemplo indo do slide 3 para 4:
    -indexAtual = -3 
    offsetWidth = 740px (tamanho do contâiner)
    -3 * 740 = -2220 */

    track.style.transform = `translateX(${translateX}px)`

    /* Atualizar os indicadores */
    document.querySelectorAll('.indicator').forEach((indicador, indice) => {
        indicador.classList.toggle('active', indice === indexAtual)
    })

    document.getElementById('currentSlide')!.textContent = (indexAtual + 1).toString()

    /* Recalcular a posição ao redimensionar. */
    window.addEventListener('resize', () => {
        irParaSlide(indexAtual)
    })
}