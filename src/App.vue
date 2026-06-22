<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold text-gray-900">资源分享平台</h1>
        <p class="text-gray-600 mt-1">汇聚各类优质资源，方便您快速获取百度网盘文件</p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
      <div class="flex flex-col lg:flex-row gap-6">
        <aside class="w-full lg:w-48 flex-shrink-0">
          <CategoryNav 
            :categories="categories" 
            :activeCategory="activeCategory"
            @select="handleCategorySelect" 
          />
        </aside>

        <div class="flex-1">
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文件名..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <ResourceList :resources="filteredResources" />
        </div>
      </div>
    </main>

    <Footer />

    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-16 right-6 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-50"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CategoryNav from './components/CategoryNav.vue'
import ResourceList from './components/ResourceList.vue'
import Footer from './components/Footer.vue'
import { parseResources } from './utils/parser.js'
import categoriesData from './data/categories.json'
import learningData from './data/categories/learning.json'
import softwareData from './data/categories/software.json'
import moviesData from './data/categories/movies.json'
import musicData from './data/categories/music.json'
import ebooksData from './data/categories/ebooks.json'

const categories = categoriesData.categories

const categoryDataMap = {
  learning: learningData,
  software: softwareData,
  movies: moviesData,
  music: musicData,
  ebooks: ebooksData
}

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll)
}

const allResources = computed(() => {
  const resources = []
  categories.forEach(category => {
    if (category.id !== 'all' && categoryDataMap[category.id]) {
      const parsedResources = parseResources(categoryDataMap[category.id].resources || [])
      parsedResources.forEach(r => {
        r.category = category.id
      })
      resources.push(...parsedResources)
    }
  })
  return resources
})

const activeCategory = ref('all')
const searchQuery = ref('')

const filteredResources = computed(() => {
  let result = allResources.value

  if (activeCategory.value !== 'all') {
    result = result.filter(r => r.category === activeCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(r => r.title.toLowerCase().includes(query))
  }

  return result
})

const handleCategorySelect = (categoryId) => {
  activeCategory.value = categoryId
}
</script>
