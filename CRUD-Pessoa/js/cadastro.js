$("#formCadastro").submit(function () {


   var nome = $('#nome').val();
   var sobrenome = $('#sobrenome').val();
   var email = $('#email').val();

   var pessoa = { id: '', nome: nome, sobrenome: sobrenome, email: email };
   var dataPessoa = JSON.stringify(pessoa);

   $ .ajax ({    
      tipo:  "POST" ,    
      url:  "http://localhost:8080/api/pessoa/cadastrar",    
      data: dataPessoa,    
      contentType:  "application / json; charset = utf-8" ,    
      dataType:  "json" ,    
      sucesso: deuCerto,    
      erro: deuErrado    
  });     

   function deuCerto(response) {
      if (response == true) {
         alert("Cadastrado com sucesso !!")
      } else {
         alert(response);
      }
   }

   function deuErrado(response) {
      alert(response)
   }


});



