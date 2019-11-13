DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE department(
    department_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DOUBLE NOT NULL
);

CREATE TABLE product(
    item_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    price DOUBLE NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DOUBLE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);
