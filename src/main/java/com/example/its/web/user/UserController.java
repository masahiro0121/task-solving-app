package com.example.its.web.user;

import com.example.its.domain.auth.UserDTO;
import com.example.its.domain.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> list() {
        return userService.findAll().stream()
                .map(UserDTO::new)
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Validated UserForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("入力内容に誤りがあります。");
        }
        userService.create(form.getUsername(), form.getPassword(), form.getAuthority());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> update(@PathVariable String username, @RequestBody @Validated UserForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("入力内容に誤りがあります。");
        }
        userService.update(username, form.getUsername(), form.getPassword(), form.getAuthority());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> delete(@PathVariable String username) {
        userService.delete(username);
        return ResponseEntity.noContent().build();
    }
}