-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS dbeval CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the user if it doesn't exist and grant privileges
CREATE USER IF NOT EXISTS 'eval'@'localhost' IDENTIFIED BY 'userpassword';
GRANT ALL PRIVILEGES ON dbeval.* TO 'eval'@'localhost';

-- Create the user for any host and grant privileges (for Docker compatibility)
CREATE USER IF NOT EXISTS 'eval'@'%' IDENTIFIED BY 'userpassword';
GRANT ALL PRIVILEGES ON dbeval.* TO 'eval'@'%';

-- Apply the changes
FLUSH PRIVILEGES; 