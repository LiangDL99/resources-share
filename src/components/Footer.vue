<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-white">资源分享</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            致力于为用户提供各类优质资源分享服务，包括软件工具、学习资料、音乐影视等丰富内容。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Globe class="h-5 w-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Mail class="h-5 w-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Phone class="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-primary-400 transition-colors">首页</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">软件工具</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">学习资料</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">影视资源</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4">关于我们</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-primary-400 transition-colors">联系我们</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">免责声明</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">隐私政策</a></li>
            <li><a href="#" class="hover:text-primary-400 transition-colors">使用条款</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 资源分享网站. All rights reserved.</p>
        <p class="mt-2">本站资源仅供学习交流使用，请在下载后24小时内删除</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Globe, Mail, Phone } from 'lucide-vue-next'
</script>