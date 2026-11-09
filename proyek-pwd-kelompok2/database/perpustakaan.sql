-- ============================================
-- DATABASE PERPUSTAKAAN (Kelompok 2)
-- ============================================
CREATE DATABASE IF NOT EXISTS db_perpustakaan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE db_perpustakaan;

CREATE TABLE buku (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    isbn        VARCHAR(20) UNIQUE NOT NULL,
    judul       VARCHAR(200) NOT NULL,
    pengarang   VARCHAR(150) NOT NULL,
    penerbit    VARCHAR(150),
    tahun       INT,
    stok        INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO buku (isbn, judul, pengarang, penerbit, tahun, stok) VALUES
('978-602-0000-01', 'Laskar Pelangi',          'Andrea Hirata',     'Bentang Pustaka', 2005, 8),
('978-979-0000-02', 'Bumi Manusia',            'Pramoedya A. Toer', 'Hasta Mitra',     1980, 5),
('978-602-0000-03', 'Clean Code',              'Robert C. Martin',  'Prentice Hall',   2008, 3),
('978-623-0000-04', 'Pemrograman Web Dasar',   'Tim Dosen PWD',     'Informatika',     2025, 12),
('978-602-0000-05', 'Filosofi Teras',          'Henry Manampiring', 'Kompas',          2018, 6);
