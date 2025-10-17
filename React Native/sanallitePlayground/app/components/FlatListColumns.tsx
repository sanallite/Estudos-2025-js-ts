import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'

interface ObjetoCartao {
    id: number
    titulo: string
    cor: string
}

const cartoes: ObjetoCartao[] = [
    { id: 1, titulo: 'Cartão 1', cor: '#FF6868' },
    { id: 2, titulo: 'Cartão 2', cor: '#4ECDC4' },
    { id: 3, titulo: 'Cartão 3', cor: '#4587D1' },
    { id: 4, titulo: 'Cartão 4', cor: '#FFA07A' },
    { id: 5, titulo: 'Cartão 5', cor: '#98C8D8' },
    { id: 6, titulo: 'Cartão 6', cor: '#F7DC67' },
    { id: 7, titulo: 'Cartão 7', cor: '#BB78CE' },
    { id: 8, titulo: 'Cartão 8', cor: '#30075aff'}
]

const LARGURA_MINIMA_CARTAO = 100
const larguraTela = Dimensions.get('window').width
const numeroColunas = Math.floor(larguraTela / LARGURA_MINIMA_CARTAO)

export default function FlatListColumns() {
    const ItemCartao = ({item}) => (
        <View style={[estilos.cartao, { backgroundColor: item.cor }]}>
            <Text style={ estilos.textoCartao }>{item.titulo}</Text>
        </View>
    )

    return (
        <View style={ estilos.container }>
            <Text style={ estilos.cabecalho }>Grid de Cartões com FlatList</Text>
            <Text style={ estilos.subtitulo }>Máximo Possível de Colunas: {numeroColunas}</Text>

            <FlatList
                data={ cartoes }
                keyExtractor={ (item) => item.id.toString() }
                renderItem={ ({item})=> <ItemCartao item={item} /> }
                numColumns={ numeroColunas }
                contentContainerStyle={ estilos.containerLista }
                columnWrapperStyle={ estilos.linha }
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    cabecalho: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#333'
    },
    subtitulo: {
        fontSize: 14,
        fontWeight: 'thin',
        textAlign: 'center',
        marginBottom: 20,
        color: '#666'
    },
    containerLista: {
        padding: 8,
    },
    linha: {
        justifyContent: 'space-between',
        marginBottom: 16
    },
    cartao: {
        flex: 1,
        margin: 4,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    textoCartao: {
        color: '#fff',
    }
})