<template>
  <header class="sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateToHome">
          <div class="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white border-opacity-30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-white">资源分享</span>
        </div>
        
        <nav class="hidden lg:flex items-center space-x-1 flex-1 max-w-3xl mx-8">
          <button
            v-for="category in visibleCategories"
            :key="category.id"
            class="px-3 py-2 text-sm text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all whitespace-nowrap backdrop-blur-sm"
            @click="selectCategory(category)"
          >
            {{ category.icon }} {{ category.name }}
          </button>

          <div class="relative" @mouseenter="showMoreMenu = true" @mouseleave="showMoreMenu = false">
            <button
              class="px-3 py-2 text-sm text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all whitespace-nowrap flex items-center space-x-1 backdrop-blur-sm"
            >
              <span>更多</span>
              <ChevronDown class="h-4 w-4" />
            </button>
            
            <div
              v-if="showMoreMenu"
              class="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
            >
              <button
                v-for="category in moreCategories"
                :key="category.id"
                class="w-full px-4 py-2 text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center space-x-2"
                @click="selectCategory(category)"
              >
                <span>{{ category.icon }}</span>
                <span>{{ category.name }}</span>
              </button>
            </div>
          </div>
        </nav>

        <div class="hidden lg:flex flex-1 max-w-xl">
          <div class="relative w-full">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索资源..."
              class="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:ring-2 focus:ring-white focus:bg-opacity-30 outline-none transition-all"
              @keyup.enter="handleSearch"
            />
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white text-opacity-70" />
          </div>
        </div>
      </div>
    </div>

    <div class="lg:hidden bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 overflow-x-auto border-t border-white border-opacity-10">
      <div class="flex space-x-2">
        <button
          v-for="category in visibleCategories"
          :key="category.id"
          class="px-3 py-1.5 text-sm text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all whitespace-nowrap backdrop-blur-sm"
          @click="selectCategory(category)"
        >
          {{ category.icon }} {{ category.name }}
        </button>
        
        <div class="relative">
          <button
            class="px-3 py-1.5 text-sm text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all whitespace-nowrap flex items-center space-x-1 backdrop-blur-sm"
            @click="toggleMobileMenu"
          >
            <span>更多</span>
            <ChevronDown class="h-4 w-4" />
          </button>
          
          <div
            v-if="mobileMenuOpen"
            class="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
          >
            <button
              v-for="category in moreCategories"
              :key="category.id"
              class="w-full px-4 py-2 text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center space-x-2"
              @click="selectCategory(category)"
            >
              <span>{{ category.icon }}</span>
              <span>{{ category.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="md:hidden bg-white bg-opacity-10 backdrop-blur-sm px-4 py-3 border-t border-white border-opacity-10">
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索资源..."
          class="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:ring-2 focus:ring-white focus:bg-opacity-30 outline-none transition-all"
          @keyup.enter="handleSearch"
        />
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white text-opacity-70" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronDown } from 'lucide-vue-next'
import { useResourceData } from '../utils/resourceData'

const emit = defineEmits(['search', 'selectCategory', 'navigate'])

const { categories } = useResourceData()
const searchQuery = ref('')
const showMoreMenu = ref(false)
const mobileMenuOpen = ref(false)

const visibleCategories = computed(() => {
  return categories.value.slice(0, 4)
})

const moreCategories = computed(() => {
  return categories.value.slice(4)
})

const navigateToHome = () => {
  emit('navigate', 'home')
}

const selectCategory = (category) => {
  showMoreMenu.value = false
  mobileMenuOpen.value = false
  emit('selectCategory', category)
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
