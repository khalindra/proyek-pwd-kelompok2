<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-emerald-700 text-white shadow-md">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 sm:gap-6">
                <RouterLink to="/" class="font-bold text-lg">📚 Perpustakaan</RouterLink>
                <RouterLink to="/" class="hover:text-emerald-200">Daftar</RouterLink>
                <RouterLink to="/buku/create" class="hover:text-emerald-200">Tambah</RouterLink>
            </div>
        </nav>
        <RouterView />
    </div>
</template>
