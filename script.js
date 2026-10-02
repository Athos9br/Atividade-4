// Cria o array que armazenará todos os registros.
let registros = [];

// Seleciona os elementos HTML necessários pelo ID.
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const listaContatos = document.getElementById("listaContatos");
const quantidade = document.getElementById("quantidade");
const mensagem = document.getElementById("mensagem");
const botaoLimpar = document.getElementById("limpar");

// Recupera os dados armazenados anteriormente.
const dadosSalvos = localStorage.getItem("registros");

// Verifica se já existem registros salvos.
if (dadosSalvos !== null) {
    // Converte o texto JSON para um array de objetos.
    registros = JSON.parse(dadosSalvos);
} else {
    // Na primeira utilização, começa com um array vazio.
    registros = [];
}

// Cria a função responsável por salvar os registros.
function salvarRegistros() {
    // Converte o array de objetos para texto JSON.
    const dadosJSON = JSON.stringify(registros);

    // Salva o texto JSON no localStorage.
    localStorage.setItem("registros", dadosJSON);
}

// Cria a função que desenha os registros no DOM.
function mostrarRegistros() {
    // Limpa a lista antes de desenhá-la novamente.
    listaContatos.innerHTML = "";

    // Verifica se não existem registros.
    if (registros.length === 0) {
        // Cria uma mensagem para a lista vazia.
        const listaVazia = document.createElement("p");

        // Adiciona uma classe CSS à mensagem.
        listaVazia.classList.add("lista-vazia");

        // Define o texto da mensagem.
        listaVazia.textContent = "Nenhum contato cadastrado ainda.";

        // Coloca a mensagem no DOM.
        listaContatos.appendChild(listaVazia);

        // Atualiza a quantidade mostrada na página.
        quantidade.textContent = "Nenhum contato cadastrado.";

        // Encerra a função.
        return;
    }

    // Percorre o array de objetos usando for...of.
    for (const registro of registros) {
        // Cria o cartão do contato.
        const cartao = document.createElement("article");

        // Adiciona a classe CSS ao cartão.
        cartao.classList.add("contato");

        // Cria o título do contato.
        const titulo = document.createElement("h3");

        // Coloca o nome do objeto no título.
        titulo.textContent = "👤 " + registro.nome;

        // Cria o parágrafo do telefone.
        const telefoneTexto = document.createElement("p");

        // Coloca o telefone do objeto no parágrafo.
        telefoneTexto.textContent = "📞 " + registro.telefone;

        // Cria o parágrafo do e-mail.
        const emailTexto = document.createElement("p");

        // Coloca o e-mail do objeto no parágrafo.
        emailTexto.textContent = "✉️ " + registro.email;

        // Adiciona o título ao cartão.
        cartao.appendChild(titulo);

        // Adiciona o telefone ao cartão.
        cartao.appendChild(telefoneTexto);

        // Adiciona o e-mail ao cartão.
        cartao.appendChild(emailTexto);

        // Adiciona o cartão à lista da página.
        listaContatos.appendChild(cartao);
    }

    // Atualiza a quantidade de registros exibida.
    if (registros.length === 1) {
        quantidade.textContent = "1 contato cadastrado.";
    } else {
        quantidade.textContent = registros.length + " contatos cadastrados.";
    }
}

// Registra o evento submit do formulário.
formulario.addEventListener("submit", function (event) {
    // Impede o recarregamento da página.
    event.preventDefault();

    // Cria um novo objeto com os valores digitados.
    const novoRegistro = {
        nome: nome.value.trim(),
        telefone: telefone.value.trim(),
        email: email.value.trim()
    };

    // Adiciona o novo objeto ao array.
    registros.push(novoRegistro);

    // Salva o array atualizado no localStorage.
    salvarRegistros();

    // Atualiza a lista no DOM.
    mostrarRegistros();

    // Mostra uma mensagem de sucesso.
    mensagem.textContent = "✅ Contato cadastrado com sucesso!";

    // Define a cor da mensagem.
    mensagem.style.color = "var(--sucesso)";

    // Limpa os campos do formulário.
    formulario.reset();

    // Deixa o cursor no campo de nome.
    nome.focus();
});

// Registra o evento click do botão de limpar.
botaoLimpar.addEventListener("click", function () {
    // Verifica se a lista já está vazia.
    if (registros.length === 0) {
        // Mostra uma mensagem informativa.
        mensagem.textContent = "ℹ️ Não existem registros para limpar.";

        // Define a cor da mensagem.
        mensagem.style.color = "var(--texto-secundario)";

        // Encerra a função.
        return;
    }

    // Pergunta se o usuário realmente deseja apagar os dados.
    const confirmar = confirm("Deseja realmente limpar todos os registros?");

    // Verifica se o usuário confirmou.
    if (confirmar) {
        // Esvazia o array.
        registros = [];

        // Salva o array vazio no localStorage.
        salvarRegistros();

        // Atualiza a página.
        mostrarRegistros();

        // Mostra uma mensagem de confirmação.
        mensagem.textContent = "🗑️ Todos os registros foram removidos.";

        // Define a cor da mensagem.
        mensagem.style.color = "var(--erro)";
    }
});

// Mostra os registros assim que a página é carregada.
mostrarRegistros();
