<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
          <p class="text-gray-500 mt-1">共 {{ resources.length }} 个资源</p>
        </div>
        
        <div v-if="showBack" class="mt-4 sm:mt-0">
          <button
            class="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            @click="$emit('back')"
          >
            <ArrowLeft class="h-4 w-4" />
            <span>返回首页</span>
          </button>
        </div>
      </div>

      <div v-if="resources.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ResourceCard
          v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
          @click="$emit('select', resource)"
        />
      </div>

      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4"></div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">没有找到资源</h3>
        <p class="text-gray-500">尝试更换搜索关键词或浏览其他分类</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import ResourceCard from './ResourceCard.vue'

defineProps({
  title: {
    type: String,
    default: '热门资源'
  },
  resources: {
    type: Array,
    default: () => []
  },
  showBack: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'back'])
</script>