CREATE DATABASE address_db;

CREATE TABLE address(
    address_id SERIAL PRIMARY KEY,
    street_number VARCHAR(20),
    street_name VARCHAR(50),
    suburb VARCHAR(50),
    city VARCHAR(50),
    province_iso VARCHAR(50),
    country_iso VARCHAR(50),
    code VARCHAR(20),
    full_address VARCHAR(100)
);
