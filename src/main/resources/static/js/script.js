
function pesquisarUsuario() {

	let namePesq = document.getElementById("namePesq").value;
	let tabela = document.querySelector("#listarUsuarios").innerHTML = "";
	const id = document.querySelector("#id");
	const name = document.querySelector("#name");
	const age = document.querySelector("#age");

	if(namePesq === ''){
		const alerta=document.querySelector("#alerta");
			const paragrafo = document.createElement("div");
			paragrafo.setAttribute("class","alert alert-success");
			paragrafo.innerHTML = "O campo de pesquisa não pode ser vazio";
			alerta.appendChild(paragrafo);
			
			setInterval(function(){location.reload(); },3000);
			
	} else {

	fetch("http://localhost:8080/BuscarPorNome?name=" + namePesq)
		.then((response) => response.json())
		.then(dados => {
			
			
			dados.map((usuario) => {
				
			
			tabela = document.querySelector("#listarUsuarios");
			const linha = document.createElement("tr");			
			const coluna1 = document.createElement("td");				
			coluna1.innerHTML=usuario.id;
			coluna1.setAttribute("class","d-none")
				linha.appendChild(coluna1);
				const coluna2 = document.createElement("td");
				coluna2.innerHTML=usuario.name;
				linha.appendChild(coluna2);
				
				const coluna3 = document.createElement("td");
				coluna3.innerHTML=usuario.age;
				linha.appendChild(coluna3);
			
				const coluna4 = document.createElement("td");
				const imgEditar=document.createElement("img");

				imgEditar.setAttribute("src","img/editar.svg");
				imgEditar.setAttribute("class","icon");
				imgEditar.setAttribute("data-bs-toggle","modal");
				imgEditar.setAttribute("data-bs-target","#exampleModal");

				imgEditar.addEventListener("click",(e)=>{
					const dados = e.target.parentNode.parentNode.childNodes;
					id.value = dados[0].innerHTML;
					name.value =dados[1].innerHTML;
					age.value=dados[2].innerHTML;
					console.log(dados);
				})
				const imgDeletar=document.createElement("img");
				imgDeletar.setAttribute("src","img/delete.svg");
				imgDeletar.setAttribute("class","icon");
				imgDeletar.addEventListener("click",(e) =>{
				
					const id = e.target.parentNode.parentNode.firstChild.innerHTML;
					deletar(id);
				})

				coluna4.appendChild(imgDeletar);
				coluna4.appendChild(imgEditar);
				linha.appendChild(coluna4);
				tabela.appendChild(linha);
		
				
				
				
				
				
		
			});
		});
};
};
document.addEventListener("DOMContentLoaded", function listarAll() {
	let tabela = document.querySelector("#listarUsuarios");
	
	const id = document.querySelector("#id");
	const name = document.querySelector("#name");
	const age = document.querySelector("#age");
	
	fetch("http://localhost:8080/listar", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	
	}).then((response) => {
		response.json().then((dados) => {
			dados.map((usuario) => {
				const linha = document.createElement("tr");				
				const coluna1 = document.createElement("td");
				
				coluna1.innerHTML=usuario.id;
				coluna1.setAttribute("class","d-none")
				linha.appendChild(coluna1);
				
				const coluna2 = document.createElement("td");
				coluna2.innerHTML=usuario.name;
				linha.appendChild(coluna2);
				
				const coluna3 = document.createElement("td");
				coluna3.innerHTML=usuario.age;
				linha.appendChild(coluna3);
				
				const coluna4 = document.createElement("td");
				
				const imgEditar=document.createElement("img");
				imgEditar.setAttribute("src","img/editar.svg");
				imgEditar.setAttribute("class","icon");
				imgEditar.setAttribute("data-bs-toggle","modal");
				imgEditar.setAttribute("data-bs-target","#exampleModal");
				imgEditar.addEventListener("click",(e)=>{
					const dados = e.target.parentNode.parentNode.childNodes;
					id.value = dados[0].innerHTML;
					name.value =dados[1].innerHTML;
					age.value=dados[2].innerHTML;
					console.log(dados);
				})
				const imgDeletar=document.createElement("img");

				imgDeletar.setAttribute("src","img/delete.svg");
				imgDeletar.setAttribute("class","icon");
				imgDeletar.addEventListener("click",(e) =>{
				
					const id = e.target.parentNode.parentNode.firstChild.innerHTML;
					deletar(id);
					window.scrollTo({
						top:0,
						left:0,
						behavior:"smooth"
					});
					
				});
				
				coluna4.appendChild(imgDeletar);
				coluna4.appendChild(imgEditar);
				linha.appendChild(coluna4);
				tabela.appendChild(linha);
			});

		});

	}).catch(err => console.log(err));
	
});
function editar() {
	var id = document.querySelector("#id").value;
	var name = document.querySelector("#name").value;
	var age = document.querySelector("#age").value;
			
	const dadosUpt = {
		id:id,
		name: name,
		age: age
	};
	fetch("http://localhost:8080/atualizarUsuario", {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(dadosUpt)
	}).then((response) => response.json()).then(()=>{
		
		const alerta=document.querySelector("#alerta");
		const paragrafo = document.createElement("div");
		paragrafo.setAttribute("class","alert alert-success");
		paragrafo.innerHTML = "Usuário Alterado com Sucesso";
		alerta.appendChild(paragrafo);
		setInterval(function(){location.reload();},3000);
		
		
	});
	

};

function deletar(id) {
	
	fetch("http://localhost:8080/excluirUsuario?id=" +id, {
		method:"DELETE",		
	}).then((response) => {
		if(response.status ==200){const alerta=document.querySelector("#alerta");
		const paragrafo = document.createElement("div");
		paragrafo.setAttribute("class","alert alert-success");
		paragrafo.innerHTML = "Usuário Excluído com Sucesso";
		alerta.appendChild(paragrafo);
		setInterval(function(){location.reload();},3000);
	}else{
		const paragrafo = document.createElement("div");
		paragrafo.setAttribute("class","alert alert-success");
		paragrafo.innerHTML = "Não foi possível excluír o Usuário";
		alerta.appendChild(paragrafo);
		setInterval(function(){location.reload();},3000);
	};
	
	});
};