DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password varchar(70) NOT NULL
);


DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    habit_id serial PRIMARY KEY,
    habitName varchar(20) NOT NULL,
    frequency varchar(20),
    streak int,
    lastComplete date,
    user_id int
);