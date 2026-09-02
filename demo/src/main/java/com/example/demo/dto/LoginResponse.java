package com.example.demo.dto;

public class LoginResponse {

    private String message;
    private String accessToken;
    private String refreshToken;

    public LoginResponse(
            String message,
            String accessToken,
            String refreshToken) {

        this.message = message;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getMessage() {
        return message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}