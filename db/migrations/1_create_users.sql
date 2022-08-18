DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password char(60) NOT NULL
);
