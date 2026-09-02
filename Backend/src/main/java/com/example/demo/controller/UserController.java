package com.example.demo.controller;

import java.util.List;

import com.example.demo.dto.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.demo.dto.RefreshTokenRequest;
import com.example.demo.dto.RefreshTokenResponse;
import com.example.demo.service.RefreshTokenService;
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService service;
    private final RefreshTokenService refreshTokenService;

    public UserController(
            UserService service,
            RefreshTokenService refreshTokenService) {

        this.service = service;
        this.refreshTokenService = refreshTokenService;
    }
    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest request){

        return service.signup(request);

    }

//    @GetMapping("/users")
//    public List<User> users(){
//
//        return service.getAllUsers();
//
//    }
@GetMapping("/admin/users")
public List<User> getAllUsers() {

    return service.getAllUsers();
}
    @GetMapping("/user/{email}")
    public UserProfileResponse getUserByEmail(
            @PathVariable String email) {

        return service.getUserByEmail(email);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){

        return service.login(request);

    }
    @PostMapping("/auth/refresh")
    public RefreshTokenResponse refreshToken(
            @RequestBody RefreshTokenRequest request) {

        String newAccessToken =
                refreshTokenService.generateNewAccessToken(
                        request.getRefreshToken()
                );

        return new RefreshTokenResponse(newAccessToken);
    }

    @GetMapping("/profile")
    public UserProfileResponse getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return service.getUserByEmail(email);
    }

}