/* Passando props de estilização e o caminho de uma imagem para um componente filho. */
import { View, Image, ImageSourcePropType } from 'react-native'

interface tiposProps {
    caminhoImg: ImageSourcePropType
    largura: number
    altura: number
    larguraBorda?: number
}

const ImagePersonalizado = ({caminhoImg, largura, altura, larguraBorda = 0}: tiposProps) => {
    return <Image source={ caminhoImg } style={{ width: largura, height: altura, borderWidth: larguraBorda }}  />
}

export default function PropsStyleImagem() {
    const imagemURI  = 'https://static.animecorner.me/2022/01/Pricone-Ep-3-3-.jpg'
    const imagemSRC = require('../../assets/images/android-icon-foreground.png')
    const alturaPadrao = 200
    const larguraPadrao = 400

    return (
        <View>
            <ImagePersonalizado caminhoImg={imagemSRC} altura={alturaPadrao} largura={larguraPadrao} larguraBorda={10}/>

            <ImagePersonalizado caminhoImg={{uri: imagemURI}} altura={300} largura={larguraPadrao}/>
        </View>
    )
}