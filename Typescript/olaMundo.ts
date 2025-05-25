const palavra: string = "Jesus Cristo é o Senhor.";
/* Síntaxe de criação de variáveis com anotação de tipo. */

console.log(palavra);

/* let ano:string = 2025; Erro de atribuição. */

let ano:number;
ano = 2025;
/* Primeiro definindo o tipo e depois o valor. */

let saudacao = 'Olá mundo';
/* saudacao = 11; Erro de atribuição, que foi feita por inferência de tipo, com o TS definindo um tipo baseado no valor da variável. */

console.log(saudacao);

let noitesDeUmVerao: any;
/* Variável que pode ter qualquer tipo, por isso noites de um verão qualquer. */

noitesDeUmVerao = false;

const anos: number | string = "2026";
/* Tipos de união, com essa variável podendo ser de um OU outro tipo, indicado pelo sinal |, também é possível adicionar mais de um tipo alternativo. */

let p: HTMLElement | null;
/* Também é possível adicionar null ou undefined como tipos de união, para representar valores opicionais. */
/* console.log(p); A variável é usada antes de ser atribuída. */

let nada:null;
/* nada = 'Tudo'; Erro de atribuição */

const coisas: (string | number)[] = ['Oi', 11, 'Tipos de união com arrays, com os tipos sendo colocados entre parênteses.'];

const objetoSimples: {
    prop1: string,
    prop2: boolean,
    prop3: number[]
} = {
    prop1: 'A',
    prop2: false,
    prop3: []
}

let objeto2: {
    numero: number
}
objeto2 = {
    numero: 1
}
/* Definição de objetos, primeiro definindo os tipos das propriedades e depois atribuindo os valores de todas. */

objetoSimples.prop1 = 'B';
console.log(objetoSimples.prop1);

type numeroArray = number | number[];
/* usando aliases de tipo para dar nome a um tipo ou uma união de tipos específica. Sendo apenas uma outra maneira de se referir aos tipos existentes. */
const dias: numeroArray = [1, 2];
const mes: numeroArray = 4;

/* const mes: numeroArray = 04; */
/* Literais octais não são permitidas, use a síntaxe 0o4. */
let zeroQuatro: number = 0o4;

type Humano = {
    nome: string,
    idade: number
}

type Usuario = {
    id: string | number
}
/* Tipos personalizados de objetos */

type HumanUser = Humano & Usuario;
/* Tipo de interseção, que combinam mais de um tipo em um, que caso esteja trabalhando com objetos, as intâncias desse tipo precisam ter todas as suas propriedades atribuídas a um valor. */

const Mar: HumanUser = {
    nome: 'Márcio',
    idade: 20,
    id: 'A'
}

console.log(Mar);

type Trabalhador = Humano & {
    cargo: string
}
/* Criando um tipo de interseção diretamente, estendendo um tipo personalizado, permitindo-nos criar tipos mais abrangentes. */

/* let caixa: Trabalhador = {
    cargo: 'Operador'
} Erro. Propriedades faltando. */

interface Jogos {
    titulo: string,
    lancamento: number
}

let sonic: Jogos = {
    titulo: 'Sonic the Hedgehog',
    lancamento: 1991
}
/* Anotações de tipo utilizando interfaces, para criação de objetos. Note que na criação de interfaces não é usado o = */

interface RPG extends Jogos {
    genero: string
}
/* Estendendo uma interface, para que suas instâncias da interface estendida herdem as mesmas propriedades da interface base. */

interface Pessoa {
    primeiroNome: string,
    nomeDoMeio?: string,
    /* A propriedade fica definida assim: nomeDoMeio: string | undefined */
    sobrenome: string
}
/* Definindo propriedades opcionais, que não precisam estar definidas nas instâncias de objetos que usam essa interface como tipo. */

type Cliente = {
    readonly id: string | number
    /* Propriedades que impedem modificações após a inicialização, mantendo seus valores constantes. */
}

let cli: Cliente = {
    id: 1
}
/* cli.id = 2; Erro. Propriedade de somente leitura. */

function greet(): void {
    console.log('oh hi');
}
const gura = (): string => {
    return 'A';
}
const verificaPar = (n: number): boolean => n%2 === 0;
console.log(verificaPar(1));
/* Usando funções, com aquelas que não retornam um valor tendo que ser do tipo void, ou undefined */

let funcao: Function;
/* Anotação do tipo função, essa variável pode receber qualquer função com quaisquer tipos de parâmetros e qualquer tipo retorno */

let funcaoAssinada: (parametro: string, outro: boolean) => void;
/* Assinatura de função, que define que essa variável só pode ser atribuída a uma função com essa estrutura: dois parâmetros, daqueles tipos e que pode ou não retornar algo. com void signficando "retorno ignorado", não "sem retorno". */

funcaoAssinada = (p: string): number => {
    return 12;
}
/* funcaoAssinada('Erro: dois argumentos esperados, apenas um obtido.'); */

let outroRetorno: () => string;
/* outroRetorno = () => {} Erro do tipo de retorno. */

let voidRetorno: () => void;
voidRetorno = ():string => {
    console.log('A');
    return 'Uma função que não tem os tipos void, undefined ou any deve retornar um valor.'
}

type Callback = (param: string | number) => void;
/* Definindo uma assinatura de função como tipo, o que é útil para funções de callback. */

let funComCallback = ( p1: string, call: Callback ) => { }
/* A função recebida por parâmetro tem que estar de acordo com a estrutura definida no tipo, nesse caso receber um parâmetro de string ou número e com o retorno sendo ignorado. */

funComCallback('Parâmetro 1', dadosRetorno => {
    console.log(dadosRetorno);
})
/* Se a função de callback for simples, também pode ser escrita em linha, dentro do parâmetro, usando a síntaxe de função de seta. */

let ops = function(algo?: any): void {
    console.log(algo);
}
/* Parâmetros opicionais, para que a função possa ser chamada mesmo sem um valor para eles. */

function taxar(preco: number, taxa: number = 0.50): number {
    return preco + preco * taxa;
}
console.log(taxar(199));
/* Função com parâmetros com valores padrão, caso a função seja chamada sem informá-lo. Uma função também pode ter parâmetros opcionais e outros com valor padrão ao meso tempo */

const calcularArea = (largura: number, altura: number = largura): void => {
    console.log(largura * altura);
}
/* Usando o valor de um parâmetro como o valor padrão de outro. */

function tresTiposUniao(tipo: 
    | string
    | number
    | boolean
) {
    return "Outra forma e escrever tipos de união."
}

let id = '12';

if ( typeof id === 'number' ) {
    console.log('Fazendo verificação de tipos com o operador typeof');
}

/* const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement; */
/* const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas"); */
/* Type assertion, afirmando um tipo que seja a versão mais, ou menos, específica daquele tipo. */

let direcoes: "esquerda" | "centro" | "direita" = "centro";
/* Tipos literais, */
/* direcoes = "right"; Erro. Só podem ser atribuídos os valores definidos no tipo de união. */

/* Assinaturas de chamada, para funções que têm propriedades. */
type FuncaoDescrita = {
    desc: string,
    (arg: string): void
}

const fazerAlgo = (fnCallback: FuncaoDescrita) => {
    console.log(fnCallback('texto'), fnCallback.desc);
}

const novaFunc = (argumento: string) => {
    return argumento;
}

/* fazerAlgo(novaFunc); */
/* Não é possível chamar a função antes de definir a propriedade desc, pois o tipo de função esperado tem essa propriedade. */

novaFunc.desc = 'padrão';
fazerAlgo(novaFunc);
/* Agora é possível chamá-la */