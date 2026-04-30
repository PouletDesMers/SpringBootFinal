package com.cour.sprintbootfinal.service;

import com.cour.sprintbootfinal.dto.*;
import com.cour.sprintbootfinal.entity.Role;
import com.cour.sprintbootfinal.entity.User;
import com.cour.sprintbootfinal.repository.UserRepository;
import com.cour.sprintbootfinal.security.JwtUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Nom d'utilisateur déjà pris");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Par défaut, tout nouvel utilisateur a le rôle USER
        user.setRoles(Set.of(Role.USER));
        user.setEnabled(true);

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getUsername(), "USER");

        return buildAuthResponse(token, user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Nom d'utilisateur ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Nom d'utilisateur ou mot de passe incorrect");
        }

        if (!user.isEnabled()) {
            throw new RuntimeException("Compte désactivé");
        }

        // On prend le premier rôle pour le token
        String role = user.getRoles().stream()
                .findFirst()
                .map(Enum::name)
                .orElse("USER");

        String token = jwtUtils.generateToken(user.getUsername(), role);

        return buildAuthResponse(token, user);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());

        return new AuthResponse(token, user.getUsername(), user.getEmail(), roles);
    }
}
