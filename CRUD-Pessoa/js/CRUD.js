
//Form the people registration 
$("#FormCadastro").submit(function cadastrar() {

    var id = $('#id').val();
    var nome = $('#nome').val();
    var sobrenome = $('#sobrenome').val();
    var email = $('#email').val();


    var pessoa = { id: id, nome: nome, sobrenome: sobrenome, email: email };
    var dataPessoa = JSON.stringify(pessoa);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/pessoa/cadastrar",
        data: dataPessoa,
        contentType: "application/json",
        success: msgEfetuadoCadastrado,
        error: msnErroCadastro,
    })


    function msgEfetuadoCadastrado() {
        alert(pessoa.nome + " Foi cadastrado com sucesso");
        $(window).attr('location', 'http://127.0.0.1:5500/listarPessoas.html');
    }

    function msnErroCadastro() {
        alert("erro")
    }
});

// Check out list of people, is empty
var mesmaResposta = null;

//Load the page listarPesssoas
$("#bntListaDePessoas").click(function() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/listar",
        success: msgListaCarregada, // list of people is empty
        error: msgErroListar,
        dataType: "json"

    });

    function msgListaCarregada(response) {

        if (mesmaResposta == null) {
            mesmaResposta = response;
            popularLista(response)
        } else {
            alert("Não exite mais pessoas na base de dados")
        }
    }

    function msgErroListar(response) {
        alert("erro")
    }

    function popularLista(ListPessoas) {
        let container = document.getElementById("listaDePessoas");
        for (i = '0'; i < ListPessoas.length; i++) {
            if (ListPessoas[i].ativo == true) {
                container.insertAdjacentHTML("beforeend", organizarLista(ListPessoas[i].id, ListPessoas[i].nome, ListPessoas[i].sobrenome, ListPessoas[i].email));
            }
        }
    }

    function organizarLista(id, nome, sobrenome, email) {
        return "<tr>" +
            "<td> " + nome + " </td> " +
            "<td> " + sobrenome + " </td> " +
            "<td>" + email + "</td>" +
            "<td>" + " <button type=" + "button \  " + "id=" + "btnAlterar" + " onclick=" + "procurarPessoa(" + (id) + ")" + " > Alterar" + "</button>" + "</td>" +
            "<td> <button>Excluir</button>" + "</td>" +
            "</tr>"
    }
});

//Search people 
function procurarPessoa(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: deuCerto,
        error: deuErrado,
        dataType: "json"
    })

    function deuCerto(response) {
        var link = "http://127.0.0.1:5500/cadastro.html"
        var newWindow = window.open(link, "_blank")
        newWindow.paramId = response;
    }

    function deuErrado() {
        "Erro ao procurar pessoa"
    }

};

//The page resgitration and load
window.onload = function() {
 
    if (window.paramId != null) {
        $("#id").val(window.paramId.id)
        $("#nome").val(window.paramId.nome)
        $("#sobrenome").val(window.paramId.sobrenome)
        $("#email").val(window.paramId.email)

    } 

};