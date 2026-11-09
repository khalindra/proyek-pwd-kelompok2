import api from './api.js'

// Semua pemanggilan API dibungkus di sini. Komponen tidak memanggil Axios langsung.
export default {
    getAll:  ()         => api.get('/buku'),
    getById: (id)       => api.get(`/buku/${id}`),
    create:  (data)     => api.post('/buku', data),
    update:  (id, data) => api.put(`/buku/${id}`, data),
    remove:  (id)       => api.delete(`/buku/${id}`)
}
