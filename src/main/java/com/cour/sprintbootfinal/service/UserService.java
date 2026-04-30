package com.cour.sprintbootfinal.service;

import com.cour.sprintbootfinal.dto.UpdateUserRequest;
import com.cour.sprintbootfinal.dto.UserResponse;
import com.cour.sprintbootfinal.entity.Role;
import com.cour.sprintbootfinal.entity.User;
import com.cour.sprintbootfinal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id: " + id));
        return toUserResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'id: " + id));

        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getRoles() != null) {
            Set<Role> roles = request.getRoles().stream()
                    .map(r -> {
                        try {
                            return Role.valueOf(r.toUpperCase());
                        } catch (IllegalArgumentException e) {
                            throw new RuntimeException("Rôle invalide: " + r + ". Rôles acceptés: USER, ADMIN");
                        }
                    })
                    .collect(Collectors.toSet());
            user.setRoles(roles);
        }
        if (request.getEnabled() != null) {
            user.setEnabled(request.getEnabled());
        }

        user = userRepository.save(user);
        return toUserResponse(user);
    }

    private UserResponse toUserResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                roles,
                user.isEnabled(),
                user.getCreatedAt()
        );
    }
}
