package com.cour.sprintbootfinal.config;

import com.cour.sprintbootfinal.entity.Role;
import com.cour.sprintbootfinal.entity.User;
import com.cour.sprintbootfinal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Créer un admin par défaut s'il n'existe pas
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Set.of(Role.ADMIN, Role.USER));
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println("✅ Admin par défaut créé : admin / admin123");
        }

        // Créer un utilisateur de test par défaut
        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRoles(Set.of(Role.USER));
            user.setEnabled(true);
            userRepository.save(user);
            System.out.println("✅ Utilisateur de test créé : user / user123");
        }
    }
}
