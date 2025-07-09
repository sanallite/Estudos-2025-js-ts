import { useState } from 'react'

import './App.css'

function Quadrado({ valor, aoClicarQuad }: { valor: 'X' | 'O' | null, aoClicarQuad: () => void }) {
  return (
    <button className='quadrado' onClick={ aoClicarQuad } >{valor}</button>
  )
}

function Tabuleiro() {
  const [quadrados, setQuadrados] = useState(Array<'X' | 'O' | null>(9).fill(null))

  function handleClick(i: number): void {
    const proximosQuadrados = quadrados.slice()
    proximosQuadrados[i] = 'X'
    setQuadrados(proximosQuadrados)
  }

  return (
    <>
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

export default Tabuleiro
