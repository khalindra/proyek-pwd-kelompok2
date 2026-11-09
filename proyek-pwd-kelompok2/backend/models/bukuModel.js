import db from '../config/db.js'

export const getAllBuku = async () => {
    const [rows] = await db.query('SELECT * FROM buku ORDER BY id DESC')
    return rows
}

export const getBukuById = async (id) => {
    const [rows] = await db.query('SELECT * FROM buku WHERE id = ?', [id])
    return rows[0]
}

export const createBuku = async (data) => {
    const sql = `INSERT INTO buku
        (isbn, judul, pengarang, penerbit, tahun, stok)
        VALUES (?, ?, ?, ?, ?, ?)`
    const [result] = await db.query(sql, [
        data.isbn, data.judul, data.pengarang,
        data.penerbit || null, data.tahun || null, data.stok
    ])
    return { id: result.insertId, ...data }
}

export const updateBuku = async (id, data) => {
    const sql = `UPDATE buku SET
        isbn = ?, judul = ?, pengarang = ?,
        penerbit = ?, tahun = ?, stok = ?
        WHERE id = ?`
    const [result] = await db.query(sql, [
        data.isbn, data.judul, data.pengarang,
        data.penerbit || null, data.tahun || null, data.stok, id
    ])
    return result.affectedRows > 0
}

export const deleteBuku = async (id) => {
    const [result] = await db.query('DELETE FROM buku WHERE id = ?', [id])
    return result.affectedRows > 0
}
