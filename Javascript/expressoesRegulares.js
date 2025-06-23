/* Validando um e-mail utilizando o método test. */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/*
 ^ = Indica que esse deve ser o início da string
 $ = Indica que esse deve ser o final da string, ou seja essa verificação será na string inteira, não em uma parte.
 [] = Uma classe de caracteres, onde qualquer caractere dentro dos colchetes é uma ocorrência válida.
 [^,] = Corresponde a qualquer coisa, execeto o que vier depois do ^, nesse caso uma virgula. O circunflexo dentro de colchetes signfica "exceto".
 \s = Espaço em branco.
 + = Quantificador de uma um mais ocorrências do que foi colocado a frente do +, nesse caso [^\s@] Ou seja ele pegará todos os caracteres que atendem a correspondência nos colchetes, não só o primeiro.
 . = Qualquer caractere.
 \. = Indica o caractere . literalmente. A \ é o caractere de escape que faz com o que um caractere especial perca seu signficado e seja lido literalmente, com o contrário também ocorrendo, como em \s

 A primeira correspondência deve ser de quaisquer caracteres exceto espaços em branco e o caractere @, a partir do ínicio da string. Esse é o nome de usuário.
 A segunda correspondência é literalmente o @. Esse é o divisor.
 A terceira correspondência é a mesma que a primeira, para o nome de dominio do provedor do email.
 A quarta correspondência deve ser o caractere . Dividindo as duas partes do nome de domínio.
 E a quinta correspondência é a mesma que a primeira e a terceira, mas que deve estar no final da string, ou seja, não pode ter nada depois disso.
 */
const email = process.argv[2] || "";
/* Argumento do Node */

/* test() retorna true ou false */
if (emailRegex.test(email)) {
    console.log("Primeiro teste: Email válido!");
}
else {
    console.log("Primeiro teste: Email inválido!");
}


/* Seguindo o formato válido para criação de e-mails. */

/* Definindo a estrutura */
// Passo 1: Um caractere que não seja ponto no início
const inicio = /[^.@\s]/;

// Passo 2: Grupos opcionais de "ponto seguido de caractere não-ponto"
const gruposPonto = /(\.[^.@\s])/;

// Passo 3: Zero ou mais desses grupos
const gruposOpcionais = /(\.[^.@\s])*/;

// Combinando tudo para a parte local
const parteLocal = /[^.@\s](\.[^.@\s]|[^.@\s])*/;

// Parte do domínio
const dominio = /[^.@\s-]([\.-][^.@\s-]|[^.@\s-])*\.[^.@\s-]{2,}/
/* 
 O primeiro caractere não pode ser um ponto, arroba, espaço em branco ou hífen
 Após e verificada zero ou mais ocorrências de um ponto ou hífen seguido de caracteres válidos ou apenas os caracteres válidos.
 Após o úlitmo ponto devem ter duas ou mais ocorrências de caracteres válidos.
 A posição do hífen dentro dos colchetes é muito importante, se não estiver no ínicio ou final ou for escapada com \ o hífen será interpretado como seu uso especial de intervalo de caracteres.

 {n, m} = Índica a menor e a maior ocorrência do caractere precedido. Quando n ou m é zero, ele poderá ser omitido. Onde, n e m devem ser inteiros positivos.
*/

const emailRegex2 = new RegExp("^[^.@\s](\.[^.@\s]|[^.@\s])*@[^.@\s-]([\.-][^.@\s-]|[^.@\s-])*\.[^.@\s-]{2,}$");

console.log('Segundo teste: ',emailRegex2.test(email));

/* Criando uma verificação mais robusta, separando os componentes em partes. */

// 1. Parte local (antes do @)
const segmentoLocal = /^[^.@\s](\.[^.@\s]|[^.@\s])*$/;

// 2. Parte do domínio - cada "segmento" entre pontos
const segmentoDominio = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

// 3. Extensão final
const extensaoFinal = /^[a-zA-Z]{2,}$/;

/* 
 Parte local:
    - Primeiro char: não pode ser ponto, arroba ou espaço
    - Meio: qualquer coisa exceto arroba e espaço  
    - Último char: não pode ser ponto, arroba ou espaço

 Domínio:
    - Primeiro char: deve ser letra ou número
    - Meio: pode ter letras, números ou hífens
    - Último char: deve ser letra ou número (não hífen)

 Extensão:
    - Deve ter pelo menos 2 letras após o ponto final.

 ? = Corresponde a expressão que o precede repetido 0 ou 1 vez. Equivalente à {0,1}.
 () = Parênteses de captura, pesquisam a correspondência e a memorizam.
*/

// Combinando tudo isso em uma função que testa cada parte:
function validarEmailCompleto(email) {
    // Estrutura básica: deve ter exatamente um @ e pelo menos um ponto após o @
    if (!email.includes('@') || email.split('@').length !== 2) {
        return false;
    }
    
    const [local, dominio] = email.split('@');
    
    // Validar parte local
    if (!segmentoLocal.test(local)) {
        return false;
    }
    
    // O domínio deve ter pelo menos um ponto
    if (!dominio.includes('.')) {
        return false;
    }
    
    // Separar o domínio em partes
    const partesDominio = dominio.split('.');
    
    // Deve ter pelo menos 2 partes (dominio.extensao)
    if (partesDominio.length < 2) {
        return false;
    }
    
    // Todas as partes exceto a última devem seguir as regras de segmento
    for (let i = 0; i < partesDominio.length - 1; i++) {
        if (!segmentoDominio.test(partesDominio[i])) {
            return false;
        }
    }
    
    // A última parte deve ser uma extensão válida
    const ultimaParte = partesDominio[partesDominio.length - 1];
    if (!extensaoFinal.test(ultimaParte)) {
        return false;
    }
    
    return true;
}

console.log('Terceiro teste: ', validarEmailCompleto(email));

/* Fazendo buscas com match. */

let texto = "Tenho 25 anos e moro na rua 123";
const numerosRegex = /\d+/g; 
/* 
 \d = dígito
 g = global (todas o ocorrências) 
*/

/* match() retorna um array com todas as ocorrências */
const numeros = texto.match(numerosRegex);
console.log(numeros);

/* Buscando a posição da primeira ocorrência com search. */

texto = "O sabiá sabia assobiar"
console.log(texto.search(/sabia/))
/* Posição 8, inluindo os espaços */

/* Substituindo com replace. */

let cpf = process.argv[3] || "";

const expressãoCPF = /(\d{3})(\d{3})(\d{3})(\d{2})/
/* Os grupos de digitos são capturados, assim dividindo-os  */

if ( cpf && cpf.length === 11 ) {
    cpf = cpf.replace(expressãoCPF, (matchCompleto, primeiroGrupo, segundoGrupo, terceiroGrupo, quartoGrupo, posicao, stringOriginal) => {
        return `${primeiroGrupo}.${segundoGrupo}.${terceiroGrupo}-${quartoGrupo}`
        /* Ao utilizar uma função como o segundo parâmetro do método replace, você tem mais liberdade para lidar com o que foi encontrado pela expressão, com esta função recebendo os parâmetros indicados acima  */
    });

    console.log(cpf);
    /* Exibindo o valor formato com a pontuação, definida no template literal retornado. */
}

else {
    console.log('Digite um valor válido com 11 números.')
}