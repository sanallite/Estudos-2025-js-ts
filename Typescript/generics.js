/* Genéricos, forma de escrever códigos flexíveis e reutilizáveis, que podem trabalhar com qualquer tipo de dado,mantendo a segurança de tipo. */
var arrString = ['a', 'b', 'c', 'z'];
var numArr = [1, 2, 4, 19];
function reduzir(array) {
    /* Não é preciso definir tipos na função reduce, ela recebe o tipo do array recebido pelo parâmetro. */
    return array.reduce(function (anteriores, atual) {
        return atual > anteriores ? atual : anteriores;
    }
    /* Operadores ternários */
    );
}
var resultado = reduzir(arrString);
/* Após declarar o tipo genérico na função, podemos chamá-la com qualquer tipo */
var outroResultado = reduzir(numArr);
/* Aqui foram feitas inferências de tipo, nas variáveis e no tipo genérico. */
console.log(resultado, outroResultado);
var encontrarMaior = function (array) { };
/* Usando a síntaxe de função de seta. */
/* "A", uma letra genérica, representa o "parâmetro de tipo", que também pode ser uma palavra. */
var Generica = /** @class */ (function () {
    function Generica(valor) {
        this.valor = valor;
        this.valor = valor;
    }
    return Generica;
}());
var quatroCinco = new Generica(45);
/* quatroCinco = 45; Erro. Depois de atribuirmos uma instância da classe com um tipo específico, não podemos atribuir um valor de outro tipo na variável. */
var quatroSeis = new Generica('46');
var dezenas = new Generica({ um: 10, dois: 20 });
/* Definindo o tipo por inferência, que como é um objeto, o tipo deve ser um objeto com essas duas propriedades com valores do tipo number. */
/* dezenas = new Generica({ quatro: 40, cinco: 50}) Erro. Faltando as propriedades um e dois. */
dezenas = new Generica({ um: 1, dois: 2 });
var centenas = new Generica({ cem: 100 });
centenas = new Generica({ duzentos: 200 });
/* Sem erro, o tipo da classe precisa ser um objeto, mas sem propriedades específicas. */
centenas = new Generica([]);
/* É possível criar uma instância com um array, devido o array ser um objeto, através da herança de protótipos, então é um subtipo de object. Isso não seria possível na variável dezenas, pois o tipo dela é um objeto que contém propriedades específicas. */
console.log(centenas);
/* Exemplo do Mimo de um uso de tipos genéricos */
var repetir = function (item, contador) {
    var resultado = [];
    for (var i = 0; i < contador; i++) {
        resultado.push(item);
    }
    return resultado;
};
var exibirPiramide = function (altura) {
    for (var i = 0; i < altura; i++) {
        var espacos = repetir(' ', altura - i - 1).join('');
        var estrelas = repetir(8, 2 * i + 1).join('');
        /* Chamando a função com tipos diferentes. */
        console.log(espacos, estrelas);
    }
};
exibirPiramide(10);
var letras = ['a', 'b', 'c'];
var casa = {
    conteudo: 'móveis'
};
/* Também é possível usar tipos genéricos em interfaces. */
function combinar() { }
/* Também é possível usar mais de um tipo genérico. */
/* A utilização de tipos genéricos é um tópico amplo, que também utiliza as outras funcionalidades do TypeScript, preciso continuar aprendendo mais sobre isso ao longo do tempo. */
/* Regras para escrever boas funções com tipos genéricos:
    Quando possível, use o parâmetro de tipo em sí em vez de restringí-lo.
    Sempre escreva o minímo possível de parâmetros de tipo.
    Se um parâmetro de tipo só aparece em uma localização, ele não é necessário.
    Quando escrever uma função com um callback, nunca escreva um parâmetro opcional a não ser que você planeja chamar a função sem passar aquele argumento.
*/ 
