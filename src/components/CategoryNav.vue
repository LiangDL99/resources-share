<template>
  <nav class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
    <h3 class="font-semibold text-gray-900 mb-4">资源分类</h3>
    <ul class="space-y-2">
      <li v-for="category in categories" :key="category.id">
        <button
          :class="[
            'w-full px-4 py-2 rounded-lg text-left transition-colors',
            activeCategory === category.id
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
          @click="$emit('select', category.id)"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  activeCategory: {
    type: String,
    default: 'all'
  }
})

defineEmits(['select'])
</script>
