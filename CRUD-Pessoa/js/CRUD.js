$("#formCadastro").click(function () {

   var nome = $('#nome').val();
   var sobrenome = $('#sobrenome').val();
   var email = $('#email').val();

   var pessoa = { id: '', nome: nome, sobrenome: sobrenome, email: email };
   var dataPessoa = JSON.stringify(pessoa);

   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/pessoa/cadastrar",
      data: dataPessoa,
      contentType: "application/json",
      sucesso: deuCerto,
      erro: deuErrado
   });

   function deuCerto() {
      alert("Cadastrado com sucesso !!")
   }

   function deuErrado() {
      alert("erro")
   }

});


$("#bntListaDePessoas").click(function () {
   $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/pessoa/listar",
      success: deuCerto,
      error: deuErro,
      dataType: "json"

   });

   function deuCerto(response) {
      popularLista(response)

   }
   function deuErro(response) {
      alert("erro")
   }

});

function popularLista(ListPessoas) {
   let container = document.getElementById("listaDePessoas");
   for (i = '0'; i < ListPessoas.length; i++) {
      container.insertAdjacentHTML("beforeend", organizarLista(ListPessoas[i].nome, ListPessoas[i].sobrenome, ListPessoas[i].email));
   }
}

function organizarLista(nome, sobrenome, email) {
   return "<th>" +
      "<td> " + nome + " </td> " +
      "<td> " + sobrenome + " </td> " +
      "<td>" + email + "</td>" +
      "</th>"
}


















