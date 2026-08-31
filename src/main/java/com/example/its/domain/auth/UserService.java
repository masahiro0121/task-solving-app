package com.example.its.domain.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void create(String username, String password, String authority) {
        var encodedPassword = passwordEncoder.encode(password);
        userRepository.insert(username, encodedPassword, authority);
    }

    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public void update(String targetUsername, String newUsername, String rawPassword, String authority) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        userRepository.update(targetUsername, newUsername, encodedPassword, authority);
    }

    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(String username) {
        userRepository.delete(username);
    }
}
