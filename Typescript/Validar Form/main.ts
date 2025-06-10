enum ErrosValidacao {
    CampoObrigatorio = 'CAMPO_OBRIGATORIO',
    LimiteCaracteres = 'MAXIMO_CARACTERES',
    TipoInvalido = 'TIPO_INVALIDO'
}
/* Específicando os tipos de erros possíveis */

interface ErrosEncontrados {
    campo: string,
    tipo: ErrosValidacao,
    mensagem: string
}
/* Interface do objeto que contém as informações dos erros. */

interface dadosForm {
    nome: string,
    email: string,
    telefone: string,
    notificacoesAtivadas: boolean
}
/* Interface do objeto que armazena os dados recebidos do formulário. */

const validarFormulario = (dados: dadosForm): ErrosEncontrados[] => {
    const erros: ErrosEncontrados[] = [];
    /* Array de objetos com as propriedades definidas na interface.  */

    if ( !dados.nome ) {
        erros.push({
            campo: 'Nome',
            tipo: ErrosValidacao.CampoObrigatorio,
            /* O campo e o nome só são usados como exemplo atualmente. */
            mensagem: 'O campo nome é obrigatório.'
        })
    }

    else if ( dados.nome.length > 20 ) {
        erros.push({
            campo: 'Nome',
            tipo: ErrosValidacao.LimiteCaracteres,
            mensagem: 'O limite de 20 caracteres para o nome foi atingido.'
        })
    }

    if ( !dados.email ) {
        erros.push({
            campo: 'E-mail',
            tipo: ErrosValidacao.CampoObrigatorio,
            mensagem: 'O campo e-mail é obrigatório.'
        })
    }

    else if ( dados.email.length > 20 ) {
        erros.push({
            campo: 'E-mail',
            tipo: ErrosValidacao.LimiteCaracteres,
            mensagem: 'O limite de 20 caracteres para o e-mail foi atingido.'
        })
    }

    if ( dados.telefone ) {
        /* Apenas se a conversão de string para number resultar em NaN, uma forma de permitir que apenas caracteres numéricos sejam aceitos. */
        if ( isNaN(Number(dados.telefone)) ) {
            erros.push({
                campo: 'Telefone',
                tipo: ErrosValidacao.TipoInvalido,
                mensagem: 'Número de telefone inválido, digite apenas números.'
            })
        }

        /* Se a string tiver apenas números e mais que 12 caracteres. */
        else if ( dados.telefone.length > 12 ) {
            erros.push({
                campo: 'Telefone',
                tipo: ErrosValidacao.LimiteCaracteres,
                mensagem: 'O limite de 12 caracteres para o número de telefone foi atingido.'
            })
        }
    }

    return erros;
}

window.addEventListener('DOMContentLoaded', () => {
    const form = <HTMLFormElement>document.getElementsByTagName('form')[0];
    const campoNome = <HTMLInputElement>document.getElementsByName('nome')[0];
    const campoEmail = <HTMLInputElement>document.getElementsByName('email')[0];
    const campoTelefone = <HTMLInputElement>document.getElementsByName('telefone')[0];
    const checkNotificacoes = <HTMLInputElement>document.getElementsByName('notificacoes')[0];
    const mensagemForm = <HTMLParagraphElement>document.querySelector('p.mensagemForm');
    /* Tipagem assertiva. */

    const pegarDados = (event: Event) => {
        event.preventDefault();
        mensagemForm.textContent = '';

        const nome = campoNome.value;
        const email = campoEmail.value;
        const telefone = campoTelefone.value;
        const notificacoes = checkNotificacoes.checked ? true : false

        const dados: dadosForm = {
            nome: nome,
            email: email,
            telefone: telefone,
            notificacoesAtivadas: notificacoes
        }

        const resultadoValidacao = validarFormulario(dados);

        /* Se o vetor com erros não estiver vazio. */
        if ( resultadoValidacao.length > 0 ) {
            resultadoValidacao.forEach(erro => {
                mensagemForm.innerHTML += `${erro.mensagem}<br>`;
                mensagemForm.classList.add('erro');
            })
        }

        else {
            mensagemForm.classList.remove('erro');

            notificacoes ? mensagemForm.textContent = 'Contato adicionado com notifcações ativadas!'
            : mensagemForm.textContent = 'Contato adicionado sem notificações!';

            campoNome.value = '';
            campoEmail.value = '';
            campoTelefone.value = '';
            checkNotificacoes.checked = false;
        }
    }

    form.addEventListener('submit', pegarDados);
})

