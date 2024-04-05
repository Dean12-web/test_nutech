CREATE TABLE users(
	email 		VARCHAR(100) PRIMARY KEY NOT NULL,
	first_name  VARCHAR(100) NOT NULL,
	last_name 	VARCHAR(100) NOT NULL,
	password	VARCHAR(100) NOT NULL,
	profile_image TEXT DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	balance 	INT DEFAULT 0
)

CREATE TABLE banners(
    banner_name VARCHAR(100) PRIMARY KEY NOT NULL,
    banner_image TEXT,
    description TEXT
);
INSERT INTO banners(banner_name, banner_image, description) 
    VALUES 
        ('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
        ('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
        ('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
        ('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
        ('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
        ('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet');


CREATE TABLE services(
	service_code VARCHAR(100) PRIMARY KEY NOT NULL,
	service_name VARCHAR(100) NOT NULL,
	service_icon TEXT,
	service_tarif INT
)
INSERT INTO services (service_code,service_name,service_icon,service_tarif)
		VALUES
		('PAJAK', 'Pajak PBB','https://nutech-integrasi.app/dummy.jpg',40000),
		('PLN', 'Listrik','https://nutech-integrasi.app/dummy.jpg',10000),
		('PDAM', 'PDAM Berlangganan','https://nutech-integrasi.app/dummy.jpg',40000),
		('PULSA', 'Pulsa','https://nutech-integrasi.app/dummy.jpg',40000),
		('PGN', 'PGN Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
		('MUSIK', 'MUSIK Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
		('TV', 'TV Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
		('PAKET_DATA', 'Paket data','https://nutech-integrasi.app/dummy.jpg',10000),
		('VOUCHER_GAME', 'Paket data','https://nutech-integrasi.app/dummy.jpg',10000),
		('VOUCHER_MAKANAN', 'Paket data','https://nutech-integrasi.app/dummy.jpg',10000),
		('QURBAN', 'Paket data','https://nutech-integrasi.app/dummy.jpg',20000),
		('ZAKAT', 'Paket data','https://nutech-integrasi.app/dummy.jpg',30000)
		

CREATE TABLE transactions (
	invoice_number VARCHAR(100) PRIMARY KEY NOT NULL, 
	transaction_type VARCHAR(100) NOT NULL,
	total_amount INT,
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (service_code) REFERENCES services(service_code),
	FOREIGN KEY (email) REFERENCES users(email)
)