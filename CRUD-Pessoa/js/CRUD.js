
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
        success: msgEfetuadoCadastrado(dataPessoa),
        error: msnErroCadastro,
    })


    function msgEfetuadoCadastrado(data) {

        alert(pessoa.nome + " Foi cadastrado com sucesso");


    }

    function msnErroCadastro() {
        alert("erro")
    }
});

// Check out list of people, is empty
var mesmaResposta = null;

//Load the page listarPesssoas
$("#bntListaDePessoas").click(function () {

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
        for (i = '0';i < ListPessoas.length;i++) {
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
            "<td> <button onclick=" + "desativarPessoa(" + id + ") " + " id=" + "btnDesativar" + ">Excluir</button>" + "</td>"
    }
});

//Update people
function alterar(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: function (data) {
            var link = "http://127.0.0.1:5500/CRUD-Pessoa/cadastro.html"
            var newWindow = window.open(link, "_blank")
            newWindow.paramPessoa = data;
        },
        error: function () {
            "Erro ao procurar pessoa"
        },
        dataType: "json"
    })

}

//Disable people
function desativarPessoa(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/pessoa/procurar/ " + id,
        success: function (data) {
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
                success: function () {
                    alert(pessoa.nome + " foi desativado com sucesso")
                },
                error: function () {
                    alert("Erro" + data)
                },
            })
        }
    })
}

//The page resgitration and load
window.onload = function () {

    if (window.paramPessoa != null) {
        $("#id").val(window.paramPessoa.id)
        $("#nome").val(window.paramPessoa.nome)
        $("#sobrenome").val(window.paramPessoa.sobrenome)
        $("#email").val(window.paramPessoa.email)

    }

};