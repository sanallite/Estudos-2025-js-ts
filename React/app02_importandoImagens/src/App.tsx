import './App.css'
import { ImageGallery } from './components/imageGallery'

function App() {
  return (
    <>
      <h1>Importando Imagens Dinâmicamente</h1>
      <h2>Utilizando 'import.meta.glob'</h2>

      <p>O código desse app foi gerado pelo Claude para fins de aprendizado.</p>

      <ImageGallery autoLoad={true} />
    </>
  )
}

export default App
