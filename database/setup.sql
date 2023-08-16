SHOW databases;

SELECT database();

USE hashdb;

CREATE TABLE HashTable (
  hash VARCHAR(255) PRIMARY KEY,
  url VARCHAR(255) NOT NULL
);

SHOW tables;

SELECT * FROM HashTable;
