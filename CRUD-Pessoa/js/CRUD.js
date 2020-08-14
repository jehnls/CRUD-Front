
//Form the people registration 
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
<<<<<<< HEAD
            "<td>" + " <button type=" + "button \  " + "id=" + "btnAlterar" + " onclick=" + "alterar(" + (id) + ")" + " > Alterar" + "</button>" + "</td>" +
            "<td> <button onclick=" + "desativarPessoa(" + id + ") " + " id=" + "btnDesativar" + ">Excluir</button>" + "</td>" +
=======
            "<td>" + " <button type=" + "button \  " + "id=" + "btnAlterar" + " onclick=" + "procurarPessoa(" + (id) + ")" + " > Alterar" + "</button>" + "</td>" +
            "<td> <button>Excluir</button>" + "</td>" +
>>>>>>> 3000f87f61c7901872848dbb1ff7422be8f9b0c8
            "</tr>"
    }
});

<<<<<<< HEAD
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

=======
//Search people 
function procurarPessoa(id) {
>>>>>>> 3000f87f61c7901872848dbb1ff7422be8f9b0c8
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

<<<<<<< HEAD
=======
    function deuCerto(response) {
        var link = "http://127.0.0.1:5500/cadastro.html"
        var newWindow = window.open(link, "_blank")
        newWindow.paramId = response;
    }
>>>>>>> 3000f87f61c7901872848dbb1ff7422be8f9b0c8


};

<<<<<<< HEAD
$(document).ready(function() {

=======
//The page resgitration and load
window.onload = function() {
 
>>>>>>> 3000f87f61c7901872848dbb1ff7422be8f9b0c8
    if (window.paramId != null) {
        $("#id").val(window.paramId.id)
        $("#nome").val(window.paramId.nome)
        $("#sobrenome").val(window.paramId.sobrenome)
        $("#email").val(window.paramId.email)

<<<<<<< HEAD
    }
=======
    } 
>>>>>>> 3000f87f61c7901872848dbb1ff7422be8f9b0c8

});