DROP TABLE IF EXISTS users;

CREATE TABLE user_account (
    id serial PRIMARY KEY,
    username varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password varchar(70) NOT NULL
);
