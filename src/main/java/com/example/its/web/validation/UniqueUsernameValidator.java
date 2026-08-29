package com.example.its.web.validation;

import com.example.its.domain.auth.UserRepository;
import jakarta.validation.ConstraintValidator;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserRepository userRepository;

    @Override
    public boolean isValid(String username, jakarta.validation.ConstraintValidatorContext context) {
        if (username == null || username.isBlank()) {
            return true;
        }
        return userRepository.findByUsername(username).isEmpty();
    }
}
