<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative overflow-hidden" :class="currentPage === 'home' && !searchQuery ? 'min-h-[500px]' : 'h-auto'">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div class="absolute inset-0 opacity-30"
          style="background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 40px 40px;">
        </div>

        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-float-slow">
        </div>
        <div
          class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float-medium"
          style="animation-delay: 2s;"></div>
        <div
          class="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-25 animate-float-fast"
          style="animation-delay: 4s;"></div>

        <div
          class="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl rotate-12 animate-float-fast opacity-20">
        </div>
        <div
          class="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float-medium opacity-20"
          style="animation-delay: 1s;"></div>
        <div
          class="absolute top-2/3 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-300 to-pink-400 rounded-3xl -rotate-12 animate-float-slow opacity-15"
          style="animation-delay: 3s;"></div>

        <div class="absolute top-1/6 left-1/6 w-4 h-4 bg-white rounded-full animate-pulse opacity-60"></div>
        <div class="absolute top-1/3 right-1/5 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-50"
          style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-1/4 left-1/3 w-5 h-5 bg-cyan-300 rounded-full animate-pulse opacity-40"
          style="animation-delay: 1.5s;"></div>
        <div class="absolute top-2/3 left-1/5 w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-50"
          style="animation-delay: 2.5s;"></div>
        <div class="absolute bottom-1/3 right-1/6 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-60"
          style="animation-delay: 3.5s;"></div>

        <div
          class="absolute top-1/5 left-1/2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg rotate-45 animate-spin-slow opacity-30">
        </div>
        <div
          class="absolute bottom-1/5 right-1/3 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-spin-reverse opacity-20"
          style="animation-delay: 1s;"></div>

        <div class="absolute top-0 left-0 w-full h-full">
          <div
            class="absolute top-1/4 left-0 w-32 h-32 bg-gradient-to-r from-purple-600 to-transparent opacity-10 transform -skew-x-12">
          </div>
          <div
            class="absolute bottom-1/4 right-0 w-40 h-40 bg-gradient-to-l from-pink-600 to-transparent opacity-10 transform skew-x-12">
          </div>
        </div>
      </div>

      <div class="relative">
        <Header @navigate="handleNavigate" @search="handleSearch" @selectCategory="handleCategorySelect" />

        <section v-if="currentPage === 'home' && !searchQuery"
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div class="text-center text-white">
            <div
              class="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-2xl mb-6 backdrop-blur-sm">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              资源分享平台
            </h1>
            <p class="text-lg md:text-xl text-white text-opacity-90 max-w-2xl mx-auto">
              汇集各类优质资源，包括软件工具、学习资料、音乐影视等，助力您的学习与生活
            </p>
          </div>
        </section>

        <div v-if="searchQuery || currentPage === 'category'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div v-if="searchQuery" class="text-white">
            <h2 class="text-2xl font-bold mb-2">搜索结果</h2>
            <p class="text-white text-opacity-80">
              找到 {{ filteredResources.length }} 个与 "{{ searchQuery }}" 相关的资源
            </p>
            <div v-if="currentCategory" class="mt-4 flex items-center space-x-2">
              <span class="text-sm text-white text-opacity-70">分类筛选：</span>
              <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm backdrop-blur-sm">
                {{ currentCategory.icon }} {{ currentCategory.name }}
              </span>
              <button class="text-sm underline hover:text-white text-opacity-80" @click="clearCategoryFilter">
                清除筛选
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentPage === 'home' && !searchQuery"
          class="absolute bottom-0 left-0 right-0 overflow-hidden h-32 pointer-events-none">
          <div class="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent"></div>

          <svg class="absolute bottom-0 w-full h-24 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
              fill="rgba(248,250,252,0.8)"></path>
          </svg>

          <svg class="absolute bottom-0 w-full h-16 animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none"
            style="animation-delay: 1s;">
            <path d="M0,80 C150,20 350,100 600,60 C850,20 1050,100 1200,80 L1200,120 L0,120 Z"
              fill="rgba(248,250,252,0.6)"></path>
          </svg>

          <div
            class="absolute bottom-12 left-1/4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float-slow opacity-40">
          </div>
          <div
            class="absolute bottom-16 right-1/3 w-2 h-2 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full animate-float-medium opacity-30"
            style="animation-delay: 0.5s;"></div>
          <div
            class="absolute bottom-10 left-2/3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float-fast opacity-35"
            style="animation-delay: 1s;"></div>
        </div>
      </div>
    </div>

    <div v-if="currentPage === 'category' && !searchQuery"
      class="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">
              {{ selectedCategory?.icon }} {{ selectedCategory?.name }}
            </h2>
            <p class="text-primary-100 mt-1">共 {{ currentResources.length }} 个资源</p>
          </div>
          <div class="hidden md:block w-64">
            <input type="text" v-model="categorySearchQuery" placeholder="在当前分类搜索..."
              class="w-full pl-10 pr-4 py-2 border-0 rounded-lg focus:ring-2 focus:ring-white outline-none text-gray-900"
              @keyup.enter="handleCategorySearch" />
          </div>
        </div>
      </div>
    </div>

    <ResourceList :title="listTitle" :resources="displayResources" :showBack="currentPage === 'category'"
      @select="openResourceDetail" @back="goHome" />

    <Footer />

    <ResourceDetail :resource="selectedResource" @close="closeResourceDetail" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ResourceList from './components/ResourceList.vue'
import ResourceDetail from './components/ResourceDetail.vue'
import { useResourceData } from './utils/resourceData'

const { categories, allResources, getCategoryResources, getCategoryInfo } = useResourceData()

const currentPage = ref('home')
const selectedCategory = ref(null)
const selectedResource = ref(null)
const searchQuery = ref('')
const categorySearchQuery = ref('')

const currentCategory = ref(null)

const displayResources = computed(() => {
  if (searchQuery.value) {
    return filteredResources.value
  }
  if (currentPage.value === 'category') {
    return filteredCategoryResources.value
  }
  return allResources.value.slice(0, 12)
})

const filteredResources = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  let results = allResources.value.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.description.toLowerCase().includes(query) ||
    r.tags?.some(tag => tag.toLowerCase().includes(query))
  )

  if (currentCategory.value) {
    results = results.filter(r => r.category === currentCategory.value.id)
  }

  return results
})

const currentResources = computed(() => {
  if (!selectedCategory.value) return []
  return getCategoryResources(selectedCategory.value.id)
})

const filteredCategoryResources = computed(() => {
  if (!categorySearchQuery.value) return currentResources.value

  const query = categorySearchQuery.value.toLowerCase()
  return currentResources.value.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.description.toLowerCase().includes(query) ||
    r.tags?.some(tag => tag.toLowerCase().includes(query))
  )
})

const listTitle = computed(() => {
  if (searchQuery.value) return '搜索结果'
  if (currentPage.value === 'category' && selectedCategory.value) {
    return `${selectedCategory.value.icon} ${selectedCategory.value.name}`
  }
  return '热门资源'
})

const handleNavigate = (page) => {
  if (page === 'home') {
    goHome()
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 'home'
  currentCategory.value = null
  selectedCategory.value = null
}

const handleCategorySearch = () => {
  // Category search is reactive through filteredCategoryResources
}

const handleCategorySelect = (category) => {
  selectedCategory.value = category
  currentPage.value = 'category'
  searchQuery.value = ''
  currentCategory.value = category
  categorySearchQuery.value = ''
  document.documentElement.scrollTop = 0
}

const clearCategoryFilter = () => {
  currentCategory.value = null
}

const goHome = () => {
  currentPage.value = 'home'
  selectedCategory.value = null
  searchQuery.value = ''
  currentCategory.value = null
  categorySearchQuery.value = ''
  document.documentElement.scrollTop = 0
}

const openResourceDetail = (resource) => {
  selectedResource.value = resource
}

const closeResourceDetail = () => {
  selectedResource.value = null
}
</script>
