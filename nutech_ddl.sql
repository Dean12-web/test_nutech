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
		
