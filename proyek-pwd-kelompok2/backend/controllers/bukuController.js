import * as bukuModel from '../models/bukuModel.js'

const wajibDiisi = (body) => {
    const { isbn, judul, pengarang, stok } = body
    return !isbn || !judul || !pengarang || stok == null || stok === ''
}

// GET /api/buku
export const getAll = async (req, res) => {
    try {
        const data = await bukuModel.getAllBuku()
        res.json({ success: true, data })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// GET /api/buku/:id
export const getOne = async (req, res) => {
    try {
        const data = await bukuModel.getBukuById(req.params.id)
        if (!data) return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' })
        res.json({ success: true, data })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// POST /api/buku
export const create = async (req, res) => {
    try {
        if (wajibDiisi(req.body)) {
            return res.status(400).json({
                success: false,
                message: 'isbn, judul, pengarang, stok wajib diisi'
            })
        }
        const data = await bukuModel.createBuku(req.body)
        res.status(201).json({ success: true, data })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'ISBN sudah terdaftar' })
        }
        res.status(500).json({ success: false, message: err.message })
    }
}

// PUT /api/buku/:id
export const update = async (req, res) => {
    try {
        if (wajibDiisi(req.body)) {
            return res.status(400).json({
                success: false,
                message: 'isbn, judul, pengarang, stok wajib diisi'
            })
        }
        const ok = await bukuModel.updateBuku(req.params.id, req.body)
        if (!ok) return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' })
        res.json({ success: true, message: 'Buku diperbarui' })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'ISBN sudah terdaftar' })
        }
        res.status(500).json({ success: false, message: err.message })
    }
}

// DELETE /api/buku/:id
export const remove = async (req, res) => {
    try {
        const ok = await bukuModel.deleteBuku(req.params.id)
        if (!ok) return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' })
        res.json({ success: true, message: 'Buku dihapus' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
