const form = document.querySelector("#form");
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
let validacao = 0;
function setError(index){
	campos[index].style.border = '2px solid #e63636';
	spans[index].style.display = 'block';
}
function removeError(index){
	campos[index].style.border = '';
	spans[index].style.display = 'none';
}


function nameValidate(){
	if(campos[0].value.length < 3){
		setError(0);
	}else{
		removeError(0);
	}
}
function ageValidate(){
	if(!campos[1].value.length > 0){
		setError(1);
	}else{
		removeError(1);
		validacao = 1;
		
			
		}
		
		
	}
	


form.addEventListener ('submit', (event) =>{
	event.preventDefault();
	nameValidate();
	ageValidate();
	console.log(validacao);
	if(validacao === 1){
		cadastrarUsuario();
	}
})



function cadastrarUsuario() {
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	
		const dadosUsuario = {
			name: name,
			age: age
		};
	
		fetch("http://localhost:8080/cadastrarUsuario", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dadosUsuario)
		}).then((response) => response.json()).then(() =>{
			const alerta=document.querySelector("#alerta");
			const paragrafo = document.createElement("div");
			paragrafo.setAttribute("class","alert alert-success w-75 border border-primary mt-5");
			paragrafo.innerText = "Usuário criado com Sucesso";
			alerta.appendChild(paragrafo);
			setInterval(function(){location.reload()},3000);
			
		})
		
	
	}

	


