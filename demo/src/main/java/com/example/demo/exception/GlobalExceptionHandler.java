package com.example.demo.exception;

import com.example.demo.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ApiErrorResponse handleUserNotFound(
            UserNotFoundException exception) {

        return new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ApiErrorResponse handleEmailExists(
            EmailAlreadyExistsException exception) {

        return new ApiErrorResponse(
                HttpStatus.CONFLICT.value(),
                exception.getMessage()
        );
    }
}