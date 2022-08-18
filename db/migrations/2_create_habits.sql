DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    habit varchar(50) NOT NULL,
    frequency int NOT NULL,
    streak int,
    lastComplete int,
    completeToday boolean,
    user_id int NOT NULL
);