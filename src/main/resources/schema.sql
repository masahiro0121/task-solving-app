DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       password VARCHAR(500) NOT NULL,
                       authority ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER'
);

CREATE TABLE issues (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        summary VARCHAR(256) NOT NULL,
                        description VARCHAR(256) NOT NULL,
                        status VARCHAR(256) NOT NULL
);