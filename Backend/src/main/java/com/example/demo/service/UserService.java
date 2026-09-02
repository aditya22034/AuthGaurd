package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.RefreshToken;
import com.example.demo.exception.EmailAlreadyExistsException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.service.JwtService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public UserService(
            UserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,RefreshTokenService refreshTokenService) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }
    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser =
                repository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {

            return new LoginResponse(
                    "Invalid Email or Password",
                    null,
                    null
            );
        }

        User user = optionalUser.get();

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            return new LoginResponse(
                    "Invalid Email or Password",
                    null,
                    null
            );
        }
        String accessToken =
                jwtService.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);


        return new LoginResponse(
                "Login Successful",
                accessToken,
                refreshToken.getToken()
        );
    }

    public UserProfileResponse getUserByEmail(String email) {

        Optional<User> optionalUser = repository.findByEmail(email);

        if (optionalUser.isEmpty()) {

            throw new UserNotFoundException(
                    "User with email " + email + " not found"
            );
        }

        User user = optionalUser.get();

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
    public SignupResponse signup(SignupRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {

            if (repository.findByEmail(request.getEmail()).isPresent()) {

                throw new EmailAlreadyExistsException(
                        "Email already exists"
                );
            }
        }

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                hashedPassword ,
                "User"
        );

        repository.save(user);

        return new SignupResponse(
                "Signup Successful",
                user.getEmail()
        );
    }
    public List<User> getAllUsers(){

        return repository.findAll();

    }

}