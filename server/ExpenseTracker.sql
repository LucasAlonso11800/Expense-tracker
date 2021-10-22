CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_username VARCHAR(40) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
	category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_user_id INT NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    FOREIGN KEY(category_user_id) REFERENCES users(user_id)
);

CREATE TABLE movements (
	movement_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movement_type CHAR(1) NOT NULL,
	movement_amount INT NOT NULL,
    movement_date CHAR(10) NOT NULL,
    movement_description VARCHAR(255) NOT NULL,
	movement_user_id INT NOT NULL,
	movement_category_id INT NOT NULL,
    FOREIGN KEY(movement_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(movement_category_id) REFERENCES categories(category_id)
);