

$( document ).ready(function(){
	
	verificarLogado();
	montaMenuNavegacao();
	montaGridProdutos()
			
});


function verificarLogado(){
	var texto;

	var usulogado = window.sessionStorage.getItem('usucamisa');

	
	if(usulogado!= null ){

		texto = 'Seja vem vindo,' + usulogado +
		'<div>' +
		'	<button class="badge badge-pill badge-info" onclick="deslogar()">Não sou ' + usulogado +'</button>'+
		'</div>';

		$("#frm_login").html(texto);

		
	}
		
}

function montaMenuNavegacao(){

	texto=
		'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'+
		'    <span class="navbar-toggler-icon"></span>'+
		'  </button>'+
		'  <div class="collapse navbar-collapse" id="navbarSupportedContent">'+
		'    <ul class="navbar-nav mr-auto">'+
		'      <li class="nav-item dropdown">'+
		'        <a class="nav-link dropdown-toggle" href="categorias.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
		'          Categorias'+
		'        </a>'+
		'        <div class="dropdown-menu" aria-labelledby="navbarDropdown">'+
		'          <a class="dropdown-item" href="#">Desenho</a>'+
		'          <a class="dropdown-item" href="#">Filmes</a>'+
		'        </div>'+
		'      </li>'+
		'      <li class="nav-item active">'+
		'        <a class="nav-link" href="trabalhe.html" target="_self">Trabalhe Conosco <span class="sr-only">(current)</span></a>'+
		'      </li>'+
		'      <li class="nav-item active">'+
		'        <a class="nav-link" href="contato.html" target="_self">Contato <span class="sr-only">(current)</span></a>'+
		'      </li>'+
		'    </ul>'+
		'  </div> ';
		  $("#menu_nav").html(texto);
}

function efetuarLogin(){
	window.sessionStorage.setItem('usucamisa','Teste');
	window.location.reload();
}

function deslogar(){
	window.sessionStorage.removeItem('usucamisa');
	window.location.reload();
}

function enviarMensagemContato(){

	alert('Agradecemos o seu contato. Retornaremos no prazo de até 72h.');
	window.location.href("index.html");
}

function enviarCurriculo(){

	alert('Analisaremos seu curriculo e entraremos em contato pelo e-mail informado quando surgir uma oportunidade.');
	window.location.href("index.html");
}

function montaGridProdutos(){

	var produtos = [];
	var publicar ='';

	produtos = carregaProdutos();

	for (var i = 0; i <produtos.length ; i++) {

		texto = '<div class="col-xs-12 col-sm-6 col-md-3" align="center">'+
				'<picture>'+
				'	<img src="iprod/'+produtos[i].codigo+'.jpg" width="200px" height="200px" id="p'+produtos[i].codigo+'" onclick="detalharProduto(this)">'+
				'	<figcaption>'+produtos[i].descricao+'</figcaption>'+					
				'	<select class="custom-select col-2" id="t'+produtos[i].codigo+'">'+
				'		<option>PP</option>'+
				'		<option>P</option>'+
				'		<option>M</option>'+
				'		<option>G</option>'+
				'		<option>GG</option>'+
				'	</select>'+
				'	<input type="number" name="q'+produtos[i].codigo+'" min="0" max="100" step="1" value="1">'+
				'	<button id="b'+produtos[i].codigo+'" class="btn btn-outline-light"  onclick="adicionarBag(this)"> '+
				'		<img src="img/bag.svg" width="20px" height="20px">'+
				'	</button>'+
				'</picture>'+
				'</div>';
		publicar = publicar + texto;		

	}

	$("#vender").html(publicar);
	 	
}




function adicionarBag(component){
				//alert(component.id) simply javascript
				id = $(component).attr('id');
				alert(id);
				
				produto = JSON.stringify({
							codigo: id,
							Nome: $("#nome"+id).text(),
							Valor: $("#valor"+id).text()
							});
				carrinho = [];
				if(window.sessionStorage.getItem("carrinho") != null){
					carrinho = JSON.parse(window.sessionStorage.getItem("carrinho"));
				}
				carrinho.push(produto);
				window.sessionStorage.setItem("carrinho", JSON.stringify(carrinho));				
			

}


function detalharProduto(component){
	alert(component);

	var codigo = String(component.id);

	alert(codigo.substring(1,codigo.length));


}

function validarDadosContato(){

	nome = String($("#txtNomeContato").value);
	email = String($("#txtEmailContato").value);
	motivo = String($("#opMotivo").value);
	mensagem = String($("#txtMensagemContato").value);
	alert('Agradecemos seu contato! Retornaremos em breve.');
	window.location.href("index.html");
	return true;

}


function listarProdutos(component){

	var alvo=""; 
	if (component.id=="btnPesquisarIndex"){
		alvo = "#vender";
	}else{
		alvo = "#resultadoPesquisa";
	}

	var pesquisa = pesquisaProduto(String(document.getElementById('txtPesquisar').value));

	
	if (pesquisa.length == 0){
		$(alvo).html("<h1> Não localizamos nenhum item que atenda sua requisição <h1>");
		return false;
	}
	else{

		var publicar ='';

		for (var i = 0; i <pesquisa.length ; i++) {

			var texto = '<div class="col-xs-12 col-sm-6 col-md-3" align="center">'+
					'<picture>'+
					'	<img src="iprod/'+pesquisa[i].codigo+'.jpg" width="200px" height="200px" id="p'+pesquisa[i].codigo+'" onclick="detalharProduto(this)">'+
					'	<figcaption>'+pesquisa[i].descricao+'</figcaption>'+					
					'	<select class="custom-select col-2" id="t'+pesquisa[i].codigo+'">'+
					'		<option>PP</option>'+
					'		<option>P</option>'+
					'		<option>M</option>'+
					'		<option>G</option>'+
					'		<option>GG</option>'+
					'	</select>'+
					'	<input type="number" name="q'+pesquisa[i].codigo+'" min="0" max="100" step="1" value="1">'+
					'	<button id="b'+pesquisa[i].codigo+'" class="btn btn-outline-light"  onclick="adicionarBag(this)"> '+
					'		<img src="img/bag.svg" width="20px" height="20px">'+
					'	</button>'+
					'</picture>'+
					'</div>';
			publicar = publicar + texto;		

		}

		$(alvo).html(publicar);
		return false;


	}

	

}


function pesquisaProduto(argumento) {


	var produtos = carregaProdutos();

	var pesquisa= [];



	for (var i = 0; i < produtos.length; i++) {
		str = String(produtos[i].descricao);
		if (str.indexOf(argumento)>=0){
			pesquisa.push(produtos[i]);
		}
		
	}

	return pesquisa;
}


function listarProdutosCategoria(component){

	var pesquisa = document.getElementById(component.id).value;

	var alvo=""; 
	if (component.id=="btnPesquisarIndex"){
		alvo = "#vender";
	}else{
		alvo = "#resultadoPesquisa";
	}

	if (pesquisa.length == 0){
		$(alvo).html("<h1> Não localizamos nenhum item que atenda sua requisição <h1>");
		return false;
	}
	else{

		var publicar ='';

		for (var i = 0; i <pesquisa.length ; i++) {

			var texto = '<div class="col-xs-12 col-sm-6 col-md-3" align="center">'+
					'<picture>'+
					'	<img src="iprod/'+pesquisa[i].codigo+'.jpg" width="200px" height="200px" id="p'+pesquisa[i].codigo+'"onclick="detalharProduto(this)">'+
					'	<figcaption>'+pesquisa[i].descricao+'</figcaption>'+					
					'	<select class="custom-select col-2" id="t'+pesquisa[i].codigo+'">'+
					'		<option>PP</option>'+
					'		<option>P</option>'+
					'		<option>M</option>'+
					'		<option>G</option>'+
					'		<option>GG</option>'+
					'	</select>'+
					'	<input type="number" name="q'+pesquisa[i].codigo+'" min="0" max="100" step="1" value="1">'+
					'	<button id="b'+pesquisa[i].codigo+'" class="btn btn-outline-light"  onclick="adicionarBag(this)"> '+
					'		<img src="img/bag.svg" width="20px" height="20px">'+
					'	</button>'+
					'</picture>'+
					'</div>';
			publicar = publicar + texto;		

		}

		$(alvo).html(publicar);
		return false;


	}

	

}


function pesquisaCategoria(argumento) {


	var produtos = carregaProdutos();

	var pesquisa= [];

	for (var i = 0; i < produtos.length; i++) {
		str = String(produtos[i].categoria);
		if (str.indexOf(argumento)>=0){
			pesquisa.push(produtos[i]);
		}
		
	}

	return pesquisa;
}

function selecionaProduto(argumento){

	var produtos = carregaProdutos();

	
	for (var i = 0; i < produtos.length; i++) {
		
		if (produtos[i].codigo==argumento){
			return produtos[i];
		}
		
	}

	return null;	

}

function carregaProdutos() {
	var listaProdutos = [{
		codigo:"001",
		descricao: "Camisa Hora de Aventura - Finn & Jake Black",
		categoria: "Desenho",
		valor: 59.90 
	},{
		codigo:"002",												
		descricao: "Camisa Hora de Aventura - Finn Blue",				
		categoria: "Desenho",									
		valor: 59.90},
		{
			codigo:"003",
			descricao: "Camisa Hora de Aventura - Jake White Longa ",
			categoria: "Desenho",
			valor: 49.90

		},
		{
			codigo:"004",
			descricao: "Camisa Hora de Aventura - Jake Amarela",
			categoria: "Desenho",
			valor: 49.90

		},
		{
			codigo:"005",
			descricao: "Camisa Hora de Aventura - Marceline Black",
			categoria: "Desenho",
			valor: 69.90

		},
		{
			codigo:"006",
			descricao: "Camisa Hora de Aventura - Princesa Doce Pink",
			categoria: "Desenho",
			valor: 49.90

		},
		{
			codigo:"007",
			descricao: "Camisa Hora de Aventura - Rei Gelado White Black",
			categoria: "Desenho",
			valor: 59.90

		},
		{
			codigo:"008",
			descricao: "Camisa Star Wars - Star Wars",
			categoria: "Filme",
			valor: 39.90

		},
		{
			codigo:"009",
			descricao: "Camisa Star Wars - Nave",
			categoria: "Filme",
			valor: 49.90

		},
		{
			codigo:"010",
			descricao: "Camisa Star Wars - Troopers",
			categoria: "Filme",
			valor: 49.90

		}];
					
	return listaProdutos;
	
}