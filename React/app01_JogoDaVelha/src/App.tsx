import { useState } from 'react'

import './App.css'

type xisOuBolinha = 'X' | 'O' | null

interface propsTabuleiro { 
  xIsProximo: boolean,
  quadrados: xisOuBolinha[],
  onPlay: (arg: xisOuBolinha[]) => void 
}

function Quadrado({ valor, aoClicarQuad }: { valor: xisOuBolinha, aoClicarQuad: () => void }) {
  return (
    <button className='quadrado' onClick={ aoClicarQuad } >{valor}</button>
  )
}

function calcularVencedor(quadrados: Array<xisOuBolinha>) {
  const linhas = [
    [0, 1, 2], // linhas horizontais
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // linhas verticais
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // linhas diagonais
    [2, 4, 6]
  ]

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i]

    console.log(i, quadrados[a], quadrados[b], quadrados[c])

    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a]
    }
  }
  
  return null
}

function Tabuleiro({xIsProximo, quadrados, onPlay}: propsTabuleiro) {
  function handleClick(i: number): void {
    if (quadrados[i] || calcularVencedor(quadrados)) {
      return
    }

    const proximosQuadrados = quadrados.slice()

    if ( xIsProximo ) {
      proximosQuadrados[i] = 'X'
    }
    
    else {
      proximosQuadrados[i] = 'O'
    }

    onPlay(proximosQuadrados)
  }

  const vencedor = calcularVencedor(quadrados)
  let status: string

  if (vencedor) {
    status = 'O vencedor do jogo é '+vencedor
  }

  else {
    status = 'O próximo jogador é '+(xIsProximo ? 'X' : 'O')
  }

  return (
    <>
      <div className='status'>{status}</div>

      <div className='linha'>
        <Quadrado valor={ quadrados[0] } aoClicarQuad={ () => handleClick(0) }/>
        <Quadrado valor={ quadrados[1] } aoClicarQuad={ () => handleClick(1) }/>
        <Quadrado valor={ quadrados[2] } aoClicarQuad={ () => handleClick(2) }/>
      </div>

      <div className='linha'>
        <Quadrado valor={ quadrados[3] } aoClicarQuad={ () => handleClick(3) }/>
        <Quadrado valor={ quadrados[4] } aoClicarQuad={ () => handleClick(4) }/>
        <Quadrado valor={ quadrados[5] } aoClicarQuad={ () => handleClick(5) }/>
      </div>

      <div className='linha'>
        <Quadrado valor={ quadrados[6] } aoClicarQuad={ () => handleClick(6) }/>
        <Quadrado valor={ quadrados[7] } aoClicarQuad={ () => handleClick(7) }/>
        <Quadrado valor={ quadrados[8] } aoClicarQuad={ () => handleClick(8) }/>
      </div>
    </>
  )
}

function Jogo() {
  const [historico, setHistorico] = useState([Array<xisOuBolinha>(9).fill(null)])
  const [turnoAtual, setTurno] = useState(0)
  const quadradosAtuais = historico[turnoAtual]
  const xIsProximo = turnoAtual % 2 === 0
  
  function handlePlay(proximosQuadrados: xisOuBolinha[]) {
    const novoHistorico = [ ...historico.slice(0, turnoAtual + 1), proximosQuadrados ]
    setHistorico(novoHistorico)
    setTurno(novoHistorico.length - 1)
  }

  function pularPara(proximoTurno: number) {
    setTurno(proximoTurno)
  }

  const movimentos = historico.map((quadrados, turno) => {
    let descricao: string

    if ( turno > 0 ) {
      descricao = `Ir para o turno ${turno}`
    }

    else {
      descricao = `Voltar para o início do jogo`
    }

    return (
      <li key={ turno }>
        <button onClick={ () => pularPara(turno) }>{ descricao }</button>
      </li>
    )
  })

  return (
    <div className='jogo'>
      <div className='tabuleiro'>
        <Tabuleiro xIsProximo={ xIsProximo } quadrados={ quadradosAtuais } onPlay={ handlePlay } />
      </div>

      <div className='info-jogo'>
        <ol>{ movimentos }</ol>
      </div>
    </div>
  )
}

export default Jogo
