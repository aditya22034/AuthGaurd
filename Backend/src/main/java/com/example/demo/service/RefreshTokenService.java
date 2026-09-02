package com.example.demo.service;

import com.example.demo.entity.RefreshToken;
import com.example.demo.model.User;
import com.example.demo.repository.RefreshTokenRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository repository;
    private final JwtService jwtService;

    public RefreshTokenService(
            RefreshTokenRepository repository,
            JwtService jwtService) {

        this.repository = repository;
        this.jwtService = jwtService;
    }

    public RefreshToken createRefreshToken(User user) {

        repository.deleteByUserId(user.getId());

        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken =
                new RefreshToken(
                        token,
                        LocalDateTime.now().plusDays(7),
                        user
                );

        return repository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(
            RefreshToken refreshToken) {

        if (refreshToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            repository.delete(refreshToken);

            throw new RuntimeException(
                    "Refresh token expired"
            );
        }

        return refreshToken;
    }

    public String generateNewAccessToken(
            String refreshTokenValue) {

        RefreshToken refreshToken =
                repository.findByToken(refreshTokenValue)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid refresh token"
                                )
                        );

        verifyExpiration(refreshToken);

        User user = refreshToken.getUser();

        return jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );
    }
}