package br.com.gerenciador.tarefas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.gerenciador.tarefas.model.*;
import br.com.gerenciador.tarefas.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Controller
@RequestMapping
public class UsuarioController {

	@Autowired
	UsuarioRepository UsuarioRepository;

	
	

	@PostMapping("/cadastrarUsuario")
	public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {

		Usuario user = UsuarioRepository.save(usuario);
		return ResponseEntity.status(HttpStatus.CREATED).body(user);

	}

	@GetMapping("/listar")
	public ResponseEntity<List<Usuario>> listAllUsuarios() {
		
		List<Usuario> usuarios = UsuarioRepository.findAll();		
		return ResponseEntity.status(HttpStatus.OK).body(usuarios);
	}
	@GetMapping("/buscarPorId/{id}")
	public ResponseEntity<Optional<Usuario>> buscarUsuarioPorId(@RequestParam String id) {
		
		Optional<Usuario> usuario = UsuarioRepository.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(usuario);
	}

	@GetMapping("/BuscarPorNome")
	public ResponseEntity<List<Usuario>> buscarUsuarioPorNome(@RequestParam String name) {

		List<Usuario> usuario = UsuarioRepository.findByName(name.trim().toUpperCase());
		
		return ResponseEntity.status(HttpStatus.OK).body(usuario);
	}
	@PutMapping("/atualizarUsuario")
	@Transactional
	public ResponseEntity<?> atualizarUsuario(@RequestBody  Usuario usuario){
		
		if(usuario.getId() == null) {
			return ResponseEntity.status(HttpStatus.OK).body("Usuário não foi informado");
		}
		var userUpdate = UsuarioRepository.saveAndFlush(usuario);
		return ResponseEntity.status(HttpStatus.CREATED).body(userUpdate);
	}
	@DeleteMapping("/excluirUsuario")
	public ResponseEntity<String> excluirUsuario(@RequestParam String id) {
		UsuarioRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Usuário excluído com Sucesso");

	}

	

}
