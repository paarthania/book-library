CREATE TABLE books (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
publish_year INT NOT NULL,
finished_reading_date DATE,
cover_url VARCHAR(255)
);
