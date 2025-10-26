/* Criando um formulário de forma eficiente usando o método map para criar várias caixas de texto com props diferentes. */
import { View, TextInput, Text } from 'react-native'
import type { KeyboardTypeOptions } from 'react-native'

interface ObjetoCaixasTexto {
    rotulo: string
    limiteCaracteres?: number
    capitalizacao?: "characters" | "none" | "words" | "sentences"
    tipoTeclado?: KeyboardTypeOptions
    editavel?: boolean
    multiLinhas?: boolean
    entradaSegura?: boolean
}
/* Para evitar confusão seria melhor dar o mesmo nome que as priopriedades têm no TextInput, ou seja em inglês. */

const camposFormulario: ObjetoCaixasTexto[] = [
    { rotulo: 'Seu nome', limiteCaracteres: 30, capitalizacao: 'characters', tipoTeclado: 'default', editavel: true, multiLinhas: false, entradaSegura: false },
    { rotulo: 'Sua idade', limiteCaracteres: 3, tipoTeclado: 'number-pad' },
    { rotulo: 'Seu CPF', editavel: false },
    { rotulo: 'Seu número de celular', tipoTeclado: 'phone-pad'},
    { rotulo: 'Seu e-mail', tipoTeclado: 'email-address', capitalizacao: 'none' },
    { rotulo: 'Observações', capitalizacao: 'words', multiLinhas: true },
    { rotulo: 'Sua senha', entradaSegura: true, capitalizacao: 'none', multiLinhas: false }
]

export default function MapTextInputs() {
    return (
        <View style={{ width: '100%', padding: 16 }}>
            <Text>Formulário</Text>

            { camposFormulario.map(item => (
                <TextInput 
                    style={[{ backgroundColor: '#fff', margin: 10, padding: 5 }, item.multiLinhas ? { height: 100 } : undefined]} 
                    key={ item.rotulo } 
                    editable={ item.editavel } 
                    placeholder={ item.rotulo } 
                    multiline={ item.multiLinhas } 
                    autoCapitalize={ item.capitalizacao }
                    secureTextEntry={ item.entradaSegura }
                    keyboardType={ item.tipoTeclado }
                    maxLength={ item.limiteCaracteres }
                    /* Para os itens que não tem essas propriedades definidas, o valor undefined é ignorado e é usado o padrão. */
                />
            )) }
        </View>
    )
}