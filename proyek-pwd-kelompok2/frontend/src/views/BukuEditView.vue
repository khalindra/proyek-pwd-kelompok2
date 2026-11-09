<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bukuService from '../services/bukuService.js'
import BukuForm from '../components/BukuForm.vue'

const route  = useRoute()
const router = useRouter()
const form = ref({ isbn: '', judul: '', pengarang: '', penerbit: '', tahun: null, stok: 0 })
const loading = ref(false)

onMounted(async () => {
    try {
        const res = await bukuService.getById(route.params.id)
        form.value = res.data.data
    } catch (e) {
        alert('Gagal memuat buku: ' + e.message)
        router.push({ name: 'buku-list' })
    }
})

const submit = async () => {
    loading.value = true
    try {
        await bukuService.update(route.params.id, form.value)
        router.push({ name: 'buku-list' })
    } catch (e) {
        alert('Gagal update: ' + (e.response?.data?.message || e.message))
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="max-w-3xl mx-auto p-4 sm:p-6">
        <div class="mb-6">
            <RouterLink to="/" class="text-emerald-600 hover:underline text-sm">&larr; Kembali</RouterLink>
            <h1 class="text-2xl font-bold text-gray-800 mt-2">✏️ Edit Buku</h1>
        </div>
        <BukuForm v-model="form" :is-edit="true" :loading="loading" @submit="submit" />
    </div>
</template>
