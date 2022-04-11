
CREATE DATABASE userData;
USE  userData;

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    PRIMARY KEY (id)
);