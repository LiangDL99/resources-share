<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div v-if="resources.length > 0" class="divide-y divide-gray-100">
      <div v-for="resource in resources" :key="resource.id"
        class="px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer" @click="handleClick(resource)">
        <div class="flex items-center justify-between">
          <div class="flex-1 min-w-0">
            <div class="text-gray-900 hover:text-blue-600 transition-colors font-medium truncate">
              {{ resource.title }}
            </div>
            <div class="mt-1 text-sm text-gray-500 truncate" :title="resource.url">
              网盘链接：{{ resource.url }}
            </div>
          </div>
          <div v-if="resource.code" class="ml-4 flex-shrink-0">
            <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {{ resource.code }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="px-4 py-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500">暂无资源</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resources: {
    type: Array,
    default: () => []
  }
})

const getFullUrl = (resource) => {
  if (resource.code) {
    return `${resource.url}?pwd=${resource.code}`
  }
  return resource.url
}

const handleClick = (resource) => {
  const url = getFullUrl(resource)
  window.open(url, '_blank')
}
</script>
