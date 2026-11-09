<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: { type: Object, required: true },
    isEdit:     { type: Boolean, default: false },
    loading:    { type: Boolean, default: false }
})
const emit = defineEmits(['submit', 'update:modelValue'])

const form = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none'
</script>

<template>
    <form @submit.prevent="emit('submit')" class="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">ISBN</label>
                <input v-model="form.isbn" type="text" required :class="inputClass" />
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Judul</label>
                <input v-model="form.judul" type="text" required :class="inputClass" />
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Pengarang</label>
                <input v-model="form.pengarang" type="text" required :class="inputClass" />
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Penerbit</label>
                <input v-model="form.penerbit" type="text" :class="inputClass" />
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Tahun Terbit</label>
                <input v-model.number="form.tahun" type="number" :class="inputClass" />
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                <input v-model.number="form.stok" type="number" min="0" required :class="inputClass" />
            </div>
        </div>

        <button type="submit" :disabled="loading"
                class="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition">
            {{ loading ? 'Menyimpan...' : (isEdit ? 'Update Buku' : 'Simpan Buku') }}
        </button>
    </form>
</template>
