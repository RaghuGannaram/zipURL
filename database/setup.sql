SHOW databases;

SELECT database();

USE hashdb;

CREATE TABLE HashTable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hashValue VARCHAR(255) NOT NULL,
  originalURL VARCHAR(255) NOT NULL
);

SHOW tables;