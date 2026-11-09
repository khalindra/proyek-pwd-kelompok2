<script setup>
import { ref, computed, onMounted } from 'vue'
import bukuService from '../services/bukuService.js'

const buku    = ref([])
const loading = ref(true)
const error   = ref('')
const cari    = ref('')

const hasilFilter = computed(() => {
    const kata = cari.value.trim().toLowerCase()
    if (!kata) return buku.value
    return buku.value.filter(b =>
        b.judul.toLowerCase().includes(kata) ||
        b.pengarang.toLowerCase().includes(kata) ||
        b.isbn.toLowerCase().includes(kata)
    )
})

const fetchData = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await bukuService.getAll()
        buku.value = res.data.data
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
}

const hapus = async (id) => {
    if (!confirm('Yakin hapus buku ini?')) return
    try {
        await bukuService.remove(id)
        fetchData()
    } catch (e) {
        alert('Gagal hapus: ' + e.message)
    }
}

onMounted(fetchData)
</script>

<template>
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <h1 class="text-2xl font-bold text-gray-800">📚 Daftar Buku</h1>
            <RouterLink to="/buku/create"
                        class="text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                + Tambah Buku
            </RouterLink>
        </div>

        <input v-model="cari" type="search" placeholder="Cari judul, pengarang, atau ISBN..."
               class="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />

        <div v-if="loading" class="text-center py-12 text-gray-500">Memuat data...</div>
        <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg">{{ error }}</div>
        <div v-else-if="buku.length === 0" class="text-center py-12 text-gray-500">Belum ada data buku.</div>
        <div v-else-if="hasilFilter.length === 0" class="text-center py-12 text-gray-500">Buku tidak ditemukan.</div>

        <div v-else class="bg-white shadow-md rounded-xl overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ISBN</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Judul</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pengarang</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Penerbit</th>
                        <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Tahun</th>
                        <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Stok</th>
                        <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="b in hasilFilter" :key="b.id" class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm font-mono text-gray-700">{{ b.isbn }}</td>
                        <td class="px-4 py-3 text-sm font-medium text-gray-800">{{ b.judul }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ b.pengarang }}</td>
                        <td class="px-4 py-3 text-sm text-gray-700">{{ b.penerbit }}</td>
                        <td class="px-4 py-3 text-sm text-center text-gray-700">{{ b.tahun }}</td>
                        <td class="px-4 py-3 text-sm text-center">
                            <span :class="b.stok > 5 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                                  class="inline-block px-2 py-1 rounded-full text-xs font-semibold">
                                {{ b.stok }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-center space-x-2 whitespace-nowrap">
                            <RouterLink :to="`/buku/edit/${b.id}`"
                                        class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                                Edit
                            </RouterLink>
                            <button @click="hapus(b.id)"
                                    class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                                Hapus
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
