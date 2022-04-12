
-- CREATE DATABASE userData;
USE  sql11485339;

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO users (userName, email, password) VALUES ('admin', 'admin@admin.com', 'admin');