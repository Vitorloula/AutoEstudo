package com.autoestudo.controller;

import com.autoestudo.entity.Usuario;
import com.autoestudo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Usuario usuario) {
        if (usuario.getName() == null || usuario.getEmail() == null || usuario.getCurso() == null) {
            return ResponseEntity.badRequest().body("Nome, e-mail e curso são obrigatórios.");
        }

        if (!usuario.getEmail().matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            return ResponseEntity.badRequest().body("Email inválido.");
        }

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @RestController
    @RequestMapping("/login")
    public class LoginController {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @PostMapping
        public ResponseEntity<?> login(@RequestBody Usuario usuario) {
            Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail());

            if (usuarioExistente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail não encontrado.");
            }

            Usuario usuarioEncontrado = usuarioExistente.get();

            if (!passwordEncoder.matches(usuario.getSenha(), usuarioEncontrado.getSenha())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso!",
                    "user", usuarioEncontrado
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Usuario novo) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setName(novo.getName());
                    usuario.setEmail(novo.getEmail());
                    usuario.setAtivo(novo.isAtivo());
                    usuario.setCurso(novo.getCurso());
                    return ResponseEntity.ok(usuarioRepository.save(usuario));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    if (!usuario.isAtivo()) {
                        usuarioRepository.delete(usuario);
                        return ResponseEntity.ok().build();
                    }
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário ativo não pode ser excluído.");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
