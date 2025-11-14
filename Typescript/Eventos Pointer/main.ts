/* Script gerado pelo Claude adaptado por mim para TypeScript */
const carrossel = document.getElementById('carousel') as HTMLDivElement
const track = document.getElementById('track') as HTMLDivElement
const containerIndicadores = document.getElementById('indicators') as HTMLDivElement

/* Estado do Carrossel */
let indexAtual: number = 0
const totalSlides: number = 5
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
    direction?: string
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
        displacement: 0
    })
})

/* Evento: pointermove. O movimento durante o arrasto. */
carrossel.addEventListener('pointermove', event => {
    if ( !isDragging ) return
    
    currentX = event.clientX
    const diferenca = currentX - startX
    const movimento = translateX + diferenca

    /* Mover o track junto com o ponteiro */
    track.style.transform = `translateX(${movimento}px)`

    /* Determinar direção */
    let direcao: string
    diferenca > 0 ? direcao = '-> Direita' : diferenca < 0 ? direcao = '<- Esquerda' : direcao = '-'

    updateDebug({
        currentX: currentX,
        displacement: diferenca,
        direction: direcao
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
        '✗ Sem mudança'
    })
})