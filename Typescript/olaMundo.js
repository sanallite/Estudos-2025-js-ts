var palavra = "Jesus Cristo é o Senhor.";
/* Síntaxe de criação de variáveis com anotação de tipo. */
console.log(palavra);
/* let ano:string = 2025; Erro de atribuição. */
var ano;
ano = 2025;
/* Primeiro definindo o tipo e depois o valor. */
var saudacao = 'Olá mundo';
/* saudacao = 11; Erro de atribuição, que foi feita por inferência de tipo, com o TS definindo um tipo baseado no valor da variável. */
console.log(saudacao);
var noitesDeUmVerao;
/* Variável que pode ter qualquer tipo, por isso noites de um verão qualquer. */
noitesDeUmVerao = false;
var anos = "2026";
/* Tipos de união, com essa variável podendo ser de um OU outro tipo, indicado pelo sinal |, também é possível adicionar mais de um tipo alternativo. */
var p;
/* Também é possível adicionar null ou undefined como tipos de união, para representar valores opicionais. */
/* console.log(p); A variável é usada antes de ser atribuída. */
var nada;
/* nada = 'Tudo'; Erro de atribuição */
var coisas = ['Oi', 11, 'Tipos de união com arrays, com os tipos sendo colocados entre parênteses.'];
var objetoSimples = {
    prop1: 'A',
    prop2: false,
    prop3: []
};
var objeto2;
objeto2 = {
    numero: 1
};
/* Definição de objetos, primeiro definindo os tipos das propriedades e depois atribuindo os valores de todas. */
objetoSimples.prop1 = 'B';
console.log(objetoSimples.prop1);
/* usando aliases de tipo para dar nome a um tipo ou uma união de tipos específica. Sendo apenas uma outra maneira de se referir aos tipos existentes. */
var dias = [1, 2];
var mes = 4;
/* const mes: numeroArray = 04; */
/* Literais octais não são permitidas, use a síntaxe 0o4. */
var zeroQuatro = 4;
/* Tipo de interseção, que combinam mais de um tipo em um, que caso esteja trabalhando com objetos, as intâncias desse tipo precisam ter todas as suas propriedades atribuídas a um valor. */
var Mar = {
    nome: 'Márcio',
    idade: 20,
    id: 'A'
};
console.log(Mar);
var sonic = {
    titulo: 'Sonic the Hedgehog',
    lancamento: 1991
};
var cli = {
    id: 1
};
/* cli.id = 2; Erro. Propriedade de somente leitura. */
function greet() {
    console.log('oh hi');
}
var gura = function () {
    return 'A';
};
var verificaPar = function (n) { return n % 2 === 0; };
console.log(verificaPar(1));
/* Usando funções, com aquelas que não retornam um valor tendo que ser do tipo void, ou undefined */
var funcao;
/* Anotação do tipo função, essa variável pode receber qualquer função com quaisquer tipos de parâmetros e qualquer tipo retorno */
var funcaoAssinada;
/* Assinatura de função, que define que essa variável só pode ser atribuída a uma função com essa estrutura: dois parâmetros, daqueles tipos e que pode ou não retornar algo. com void signficando "retorno ignorado", não "sem retorno". */
funcaoAssinada = function (p) {
    return 12;
};
/* funcaoAssinada('Erro: dois argumentos esperados, apenas um obtido.'); */
var outroRetorno;
/* outroRetorno = () => {} Erro do tipo de retorno. */
var voidRetorno;
voidRetorno = function () {
    console.log('A');
    return 'Uma função que não tem os tipos void, undefined ou any deve retornar um valor.';
};
/* Definindo uma assinatura de função como tipo, o que é útil para funções de callback. */
var funComCallback = function (p1, call) { };
/* A função recebida por parâmetro tem que estar de acordo com a estrutura definida no tipo, nesse caso receber um parâmetro de string ou número e com o retorno sendo ignorado. */
funComCallback('Parâmetro 1', function (dadosRetorno) {
    console.log(dadosRetorno);
});
/* Se a função de callback for simples, também pode ser escrita em linha, dentro do parâmetro, usando a síntaxe de função de seta. */
var ops = function (algo) {
    console.log(algo);
};
/* Parâmetros opicionais, para que a função possa ser chamada mesmo sem um valor para eles. */
function taxar(preco, taxa) {
    if (taxa === void 0) { taxa = 0.50; }
    return preco + preco * taxa;
}
console.log(taxar(199));
/* Função com parâmetros com valores padrão, caso a função seja chamada sem informá-lo. Uma função também pode ter parâmetros opcionais e outros com valor padrão ao meso tempo */
var calcularArea = function (largura, altura) {
    if (altura === void 0) { altura = largura; }
    console.log(largura * altura);
};
/* Usando o valor de um parâmetro como o valor padrão de outro. */
function tresTiposUniao(tipo) {
    return "Outra forma e escrever tipos de união.";
}
var id = '12';
if (typeof id === 'number') {
    console.log('Fazendo verificação de tipos com o operador typeof');
}
/* const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement; */
/* const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas"); */
/* Type assertion, afirmando um tipo que seja a versão mais, ou menos, específica daquele tipo. */
var direcoes = "centro";
var fazerAlgo = function (fnCallback) {
    console.log(fnCallback('texto'), fnCallback.desc);
};
var novaFunc = function (argumento) {
    return argumento;
};
/* fazerAlgo(novaFunc); */
/* Não é possível chamar a função antes de definir a propriedade desc, pois o tipo de função esperado tem essa propriedade. */
novaFunc.desc = 'padrão';
fazerAlgo(novaFunc);
/* Definindo os possíveis parâmetros, assim podemos chamar essa mesma função com um ou três argumentos, mas não dois. */
function criarData(diaOuTimestamp, mes, ano) {
    if (mes !== undefined && ano !== undefined) {
        return new Date(ano, mes, diaOuTimestamp);
    }
    else {
        return new Date(diaOuTimestamp);
    }
}
/* Implementação da função com uma assinatura compatível. */
var hoje = criarData(26, 5, 2025);
var dataQualquer = criarData(12345678);
/* A assinatura da implementação não é visível para fora, quando escrever uma função com sobrecargas, você deve ter sempre duas ou mais assinaturas antes da implementação da função. A compatibilidade da implementação com a assinatura também depende de usar os mesmos tipos nos parâmetros e no retorno. */
/* Sempre prefira parâmetros com tipos de união em vez de sobrecargas quando possível. */
/* Tipo unknown. Representa qualquer valor, mas não é possível fazer qualquer coisa com um valor unknown. */
var a = 'A';
/* a.teste(); Erro. Não se sabe o tipo da variável para saber se ela tem essa propridade chamável. Se o tipo fosse any, essa chamada não teria erro. */
/* Tipo never. Representa valores que nunca são observados. Num tipo de retorno significa que a função joga uma exceção ou termina a execução do programa. */
function fail(msg) {
    throw new Error(msg);
}
/* Podemos definir funções com um número ilimitado de parâmetros utilizando rest parameters. O tipo inplícito desses parâmetros é sempre any[] */
var multiplicar = function (numero) {
    var multiplicadores = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        multiplicadores[_i - 1] = arguments[_i];
    }
    return multiplicadores.map(function (nAtual) { return numero * nAtual; });
};
console.log(multiplicar(5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
function somarTres(_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    return a + b + c;
}
/* console.log(somarTres({1,23,10})); Erro, o objeto precisa ter as propriedades a, b e c, assim como o objeto ma definição de parâmetros */
console.log(somarTres({ a: 12, b: 2, c: 4 }));
