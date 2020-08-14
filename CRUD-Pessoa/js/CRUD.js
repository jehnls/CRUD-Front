$("#FormCadastro").submit(function cadastrar() {

    var pessoa = {
        id: $('#id').val(),
        nome: $('#nome').val(),
        sobrenome: $('#sobrenome').val(),
        email: $('#email').val()
    };

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

var pessoaCadastrada = null;
var mesmaResposta = null;

$("#bntListaDePessoas").click(function() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/listar",
        success: msgListaCarregada,
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

    function msgErroListar() {
        alert("erro") + response.alert
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
            "<td>" + " <button type=" + "button \  " + "id=" + "btnAlterar" + " onclick=" + "alterar(" + (id) + ")" + " > Alterar" + "</button>" + "</td>" +
            "<td> <button onclick=" + "desativarPessoa(" + id + ") " + " id=" + "btnDesativar" + ">Excluir</button>" + "</td>" +
            "</tr>"
    }
});

function alterar(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: function(data) {
            var link = "http://127.0.0.1:5500/cadastro.html"
            var newWindow = window.open(link, "_blank")
            newWindow.paramId = data;
        },
        error: function() {
            "Erro ao procurar pessoa"
        },
        dataType: "json"
    })

}

function desativarPessoa(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: function(data) {
            var pessoa = {
                ativo: false,
                id: data.id,
                nome: data.nome,
                sobrenome: data.sobrenome,
                email: data.email,
            }

            dataPessoa = JSON.stringify(pessoa)
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/pessoa/cadastrar",
                data: dataPessoa,
                contentType: "application/json",
                success: function() {
                    alert(pessoa.nome + "Foi desativado com sucesso")
                },
                error: function() {
                    alert("Erro" + data)
                },
            })
        },
        error: function(data) {
            console.log(data)
        },
        dataType: "json"
    })



};

$(document).ready(function() {

    if (window.paramId != null) {
        $("#id").val(window.paramId.id)
        $("#nome").val(window.paramId.nome)
        $("#sobrenome").val(window.paramId.sobrenome)
        $("#email").val(window.paramId.email)

    }

});