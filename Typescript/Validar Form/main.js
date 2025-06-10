var ErrosValidacao;
(function (ErrosValidacao) {
    ErrosValidacao["CampoObrigatorio"] = "CAMPO_OBRIGATORIO";
    ErrosValidacao["LimiteCaracteres"] = "MAXIMO_CARACTERES";
    ErrosValidacao["TipoInvalido"] = "TIPO_INVALIDO";
})(ErrosValidacao || (ErrosValidacao = {}));
/* Interface do objeto que armazena os dados recebidos do formulário. */
var validarFormulario = function (dados) {
    var erros = [];
    /* Array de objetos com as propriedades definidas na interface.  */
    if (!dados.nome) {
        erros.push({
            campo: 'Nome',
            tipo: ErrosValidacao.CampoObrigatorio,
            /* O campo e o nome só são usados como exemplo atualmente. */
            mensagem: 'O campo nome é obrigatório.'
        });
    }
    else if (dados.nome.length > 20) {
        erros.push({
            campo: 'Nome',
            tipo: ErrosValidacao.LimiteCaracteres,
            mensagem: 'O limite de 20 caracteres para o nome foi atingido.'
        });
    }
    if (!dados.email) {
        erros.push({
            campo: 'E-mail',
            tipo: ErrosValidacao.CampoObrigatorio,
            mensagem: 'O campo e-mail é obrigatório.'
        });
    }
    else if (dados.email.length > 20) {
        erros.push({
            campo: 'E-mail',
            tipo: ErrosValidacao.LimiteCaracteres,
            mensagem: 'O limite de 20 caracteres para o e-mail foi atingido.'
        });
    }
    if (dados.telefone) {
        /* Apenas se a conversão de string para number resultar em NaN, uma forma de permitir que apenas caracteres numéricos sejam aceitos. */
        if (isNaN(Number(dados.telefone))) {
            erros.push({
                campo: 'Telefone',
                tipo: ErrosValidacao.TipoInvalido,
                mensagem: 'Número de telefone inválido, digite apenas números.'
            });
        }
        /* Se a string tiver apenas números e mais que 12 caracteres. */
        else if (dados.telefone.length > 12) {
            erros.push({
                campo: 'Telefone',
                tipo: ErrosValidacao.LimiteCaracteres,
                mensagem: 'O limite de 12 caracteres para o número de telefone foi atingido.'
            });
        }
    }
    return erros;
};
window.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementsByTagName('form')[0];
    var campoNome = document.getElementsByName('nome')[0];
    var campoEmail = document.getElementsByName('email')[0];
    var campoTelefone = document.getElementsByName('telefone')[0];
    var checkNotificacoes = document.getElementsByName('notificacoes')[0];
    var mensagemForm = document.querySelector('p.mensagemForm');
    /* Tipagem assertiva. */
    var pegarDados = function (event) {
        event.preventDefault();
        mensagemForm.textContent = '';
        var nome = campoNome.value;
        var email = campoEmail.value;
        var telefone = campoTelefone.value;
        var notificacoes = checkNotificacoes.checked ? true : false;
        var dados = {
            nome: nome,
            email: email,
            telefone: telefone,
            notificacoesAtivadas: notificacoes
        };
        var resultadoValidacao = validarFormulario(dados);
        /* Se o vetor com erros não estiver vazio. */
        if (resultadoValidacao.length > 0) {
            resultadoValidacao.forEach(function (erro) {
                mensagemForm.innerHTML += "".concat(erro.mensagem, "<br>");
                mensagemForm.classList.add('erro');
            });
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
    };
    form.addEventListener('submit', pegarDados);
});
