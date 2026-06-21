<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1" @click="$emit('click', resource)">
    <div class="relative h-48 overflow-hidden">
      <img
        :src="resource.screenshots?.[0] || 'https://picsum.photos/400/300?random=0'"
        :alt="resource.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute top-3 left-3">
        <span class="px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
          {{ resource.categoryName }}
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ resource.title }}
      </h3>
      <p class="text-gray-500 text-sm mb-3 line-clamp-2">
        {{ resource.description }}
      </p>
      
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in resource.tags?.slice(0, 3)"
          :key="tag"
          class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      
      <div class="flex items-center justify-between text-xs text-gray-400">
        <span class="flex items-center">
          <Calendar class="h-3 w-3 mr-1" />
          {{ resource.uploadTime }}
        </span>
        <span v-if="resource.size" class="flex items-center">
          <HardDrive class="h-3 w-3 mr-1" />
          {{ resource.size }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, HardDrive } from 'lucide-vue-next'

defineProps({
  resource: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>