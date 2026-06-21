<template>
  <div v-if="resource" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col relative">
      <button
        class="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        @click="$emit('close')"
      >
        <X class="h-5 w-5 text-gray-600" />
      </button>

      <div class="flex items-center justify-between p-4 border-b bg-gray-50">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span class="text-white text-xl">{{ resource.categoryName?.charAt(0) }}</span>
          </div>
          <div>
            <h2 class="font-bold text-gray-900">{{ resource.title }}</h2>
            <p class="text-sm text-gray-500">{{ resource.categoryName }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2 text-sm text-gray-500 mr-12">
          <span>{{ currentIndex + 1 }} / {{ resource.screenshots?.length || 0 }}</span>
        </div>
      </div>

      <div class="flex-1 overflow-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 h-full">
          <div class="lg:col-span-2 bg-black relative">
            <div class="relative aspect-video lg:aspect-auto lg:h-full">
              <img
                :src="currentScreenshot"
                :alt="resource.title"
                class="w-full h-full object-contain cursor-pointer"
                @click="openFullscreen"
              />
              
              <button
                v-if="resource.screenshots?.length > 1"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all"
                @click="prevImage"
              >
                <ChevronLeft class="h-6 w-6 text-gray-700" />
              </button>
              
              <button
                v-if="resource.screenshots?.length > 1"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all"
                @click="nextImage"
              >
                <ChevronRight class="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div v-if="resource.screenshots?.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                v-for="(screenshot, index) in resource.screenshots"
                :key="index"
                class="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all hover:scale-110"
                :class="currentIndex === index ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-300 opacity-60'"
                @click="currentIndex = index"
              >
                <img :src="screenshot" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-1 p-6 overflow-y-auto max-h-[60vh] lg:max-h-full bg-white">
            <div class="space-y-6">
              <div>
                <span class="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                  {{ resource.categoryName }}
                </span>
                <p class="text-xs text-gray-400 mt-2 flex items-center">
                  <Calendar class="h-3 w-3 mr-1" />
                  上传时间：{{ resource.uploadTime }}
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 mb-2">资源描述</h3>
                <p class="text-gray-600 text-sm leading-relaxed">{{ resource.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-3">
                  <div class="flex items-center space-x-2 mb-1">
                    <HardDrive class="h-4 w-4 text-primary-600" />
                    <p class="text-xs text-gray-500">文件大小</p>
                  </div>
                  <p class="font-medium text-gray-900">{{ resource.size || '未知' }}</p>
                </div>

                <div class="bg-gray-50 rounded-lg p-3">
                  <div class="flex items-center space-x-2 mb-1">
                    <Globe class="h-4 w-4 text-primary-600" />
                    <p class="text-xs text-gray-500">语言</p>
                  </div>
                  <p class="font-medium text-gray-900">{{ resource.language || '未知' }}</p>
                </div>
              </div>

              <div v-if="resource.tags?.length">
                <h4 class="font-semibold text-gray-900 mb-3">标签</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in resource.tags"
                    :key="tag"
                    class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="space-y-3 pt-4 border-t">
                <a
                  :href="resource.downloadUrl"
                  class="flex items-center justify-center w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download class="h-5 w-5 mr-2" />
                  获取资源
                </a>
                
                <button
                  class="flex items-center justify-center w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  @click="copyLink"
                >
                  <Copy class="h-5 w-5 mr-2" />
                  复制下载链接
                </button>

                <button
                  v-if="resource.screenshots?.length > 1"
                  class="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  @click="openFullscreen"
                >
                  <Maximize2 class="h-5 w-5 mr-2" />
                  全屏查看截图
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showFullscreen" class="fixed inset-0 z-[60] bg-black" @click="closeFullscreen">
      <button
        class="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
        @click.stop="closeFullscreen"
      >
        <X class="h-6 w-6 text-white" />
      </button>
      
      <button
        v-if="resource.screenshots?.length > 1"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
        @click.stop="prevImage"
      >
        <ChevronLeft class="h-8 w-8 text-white" />
      </button>
      
      <button
        v-if="resource.screenshots?.length > 1"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
        @click.stop="nextImage"
      >
        <ChevronRight class="h-8 w-8 text-white" />
      </button>
      
      <div class="flex items-center justify-center h-full px-20">
        <img
          :src="currentScreenshot"
          :alt="resource.title"
          class="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <button
          v-for="(screenshot, index) in resource.screenshots"
          :key="index"
          class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-110"
          :class="currentIndex === index ? 'border-white' : 'border-white border-opacity-30'"
          @click.stop="currentIndex = index"
        >
          <img :src="screenshot" class="w-full h-full object-cover" />
        </button>
      </div>
      
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {{ currentIndex + 1 }} / {{ resource.screenshots?.length || 0 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { X, Calendar, HardDrive, Globe, Download, Copy, Maximize2, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  resource: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const currentIndex = ref(0)
const showFullscreen = ref(false)

watch(() => props.resource, () => {
  currentIndex.value = 0
  showFullscreen.value = false
})

const currentScreenshot = computed(() => {
  if (!props.resource?.screenshots?.length) {
    return 'https://picsum.photos/1200/800?random=0'
  }
  if (currentIndex.value >= props.resource.screenshots.length) {
    currentIndex.value = 0
  }
  return props.resource.screenshots[currentIndex.value]
})

const prevImage = () => {
  if (!props.resource?.screenshots?.length) return
  currentIndex.value = currentIndex.value === 0 
    ? props.resource.screenshots.length - 1 
    : currentIndex.value - 1
}

const nextImage = () => {
  if (!props.resource?.screenshots?.length) return
  currentIndex.value = currentIndex.value === props.resource.screenshots.length - 1 
    ? 0 
    : currentIndex.value + 1
}

const openFullscreen = () => {
  showFullscreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullscreen = () => {
  showFullscreen.value = false
  document.body.style.overflow = ''
}

const copyLink = () => {
  if (props.resource?.downloadUrl) {
    navigator.clipboard.writeText(props.resource.downloadUrl).then(() => {
      alert('链接已复制到剪贴板')
    }).catch(() => {
      alert('复制失败，请手动复制')
    })
  }
}
</script>
