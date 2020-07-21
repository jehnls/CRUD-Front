function cadastrar() {

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
        success: deuCerto(pessoa),
        error: deuErrado,
    })

    function deuCerto(pessoa) {
        alert(pessoa.nome + " Foi cadastrado com sucesso")
        location.href("http://127.0.0.1:5500/listarPessoas.html");
    }

    function deuErrado() {
        alert("erro")
    }

};

var mesmaResposta = null;


$("#bntListaDePessoas").click(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/listar",
        success: deuCerto,
        error: deuErro,
        dataType: "json"

    });

    function deuCerto(response) {
        if (mesmaResposta == null) {
            mesmaResposta = response;
            popularLista(response)
        } else {
            alert("Não exite mais pessoas na base de dados")
        }


    }

    function deuErro(response) {
        alert("erro")
    }

});

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
        "<td>  <a href=" + "http://127.0.0.1:5500/CRUD-Pessoa/cadastro.html?" + id + ">" + "<button id=" + "btnAlterar" + "type= " + "button " + "> Alterar" + "</button>" + "</a>" + "</td>" +
        "<td> <button>Excluir</button>" + "</td>" +
        "</tr>"
}






function procurarPessoa(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: deuCerto,
        error: deuErrado,
        dataType: "json"
    })


    function deuCerto(response) {
        $("#id").val(response.id)
        $("#nome").val(response.nome)
        $("#sobrenome").val(response.sobrenome)
        $("#email").val(response.email)


    }

    function deuErrado(response) {
        alert(response, "erro")
    }

};

$("#formCadastro").ready(function() {
    var query = location.search;
    var pessoaid = query.split("");

    if (pessoaid[0] != null) {

        procurarPessoa(pessoaid[1]);


    }

});