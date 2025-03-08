-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the user if it doesn't exist and grant privileges
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'userpassword';
GRANT ALL PRIVILEGES ON mydb.* TO 'user'@'localhost';

-- Create the user for any host and grant privileges (for Docker compatibility)
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'userpassword';
GRANT ALL PRIVILEGES ON mydb.* TO 'user'@'%';

-- Apply the changes
FLUSH PRIVILEGES; 