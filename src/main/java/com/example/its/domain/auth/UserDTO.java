package com.example.its.domain.auth;

import lombok.Getter;

@Getter
public class UserDTO {

    private final String username;
    private final String authority;

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.authority = user.getAuthority().name();
    }
}
