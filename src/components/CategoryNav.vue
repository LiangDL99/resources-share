<template>
  <section class="py-12 bg-gradient-to-br from-primary-50 to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">资源分类</h2>
        <p class="text-gray-600">浏览我们丰富的资源类别，找到您需要的内容</p>
      </div>

      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card cursor-pointer group"
          @click="selectCategory(category)"
        >
          <div class="w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-4 hover:-translate-y-1">
            <span class="text-4xl mb-3 transition-transform group-hover:scale-110">{{ category.icon }}</span>
            <span class="text-sm font-medium text-gray-700 text-center">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import categoriesData from '../data/categories.json'

const emit = defineEmits(['select'])

const categories = ref(categoriesData.categories)

const selectCategory = (category) => {
  emit('select', category)
}
</script>

<style scoped>
.category-card {
  perspective: 1000px;
}

.category-card > div {
  transform-style: preserve-3d;
}

.category-card:hover > div {
  transform: rotateX(2deg) rotateY(-2deg);
}
</style>