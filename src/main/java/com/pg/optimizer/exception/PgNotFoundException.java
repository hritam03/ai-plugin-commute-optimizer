package com.pg.optimizer.exception;

public class PgNotFoundException extends RuntimeException {

    public PgNotFoundException(String message) {
        super(message);
    }
}
