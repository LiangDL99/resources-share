import { ref, computed } from 'vue'
import categoriesData from '../data/categories.json'

import softwareData from '../data/categories/software.json'
import imagesData from '../data/categories/images.json'
import kidsLearningData from '../data/categories/kids-learning.json'
import musicData from '../data/categories/music.json'
import snacksData from '../data/categories/snacks.json'
import fitnessData from '../data/categories/fitness.json'
import sideHustleData from '../data/categories/side-hustle.json'
import mobileGamesData from '../data/categories/mobile-games.json'
import ancientBooksData from '../data/categories/ancient-books.json'
import ebooksData from '../data/categories/e-books.json'
import moviesData from '../data/categories/movies.json'
import techTutorialsData from '../data/categories/tech-tutorials.json'
import adultLearningData from '../data/categories/adult-learning.json'

const categoryDataMap = {
  'software': softwareData,
  'images': imagesData,
  'kids-learning': kidsLearningData,
  'music': musicData,
  'snacks': snacksData,
  'fitness': fitnessData,
  'side-hustle': sideHustleData,
  'mobile-games': mobileGamesData,
  'ancient-books': ancientBooksData,
  'e-books': ebooksData,
  'movies': moviesData,
  'tech-tutorials': techTutorialsData,
  'adult-learning': adultLearningData
}

const categories = ref(categoriesData.categories)
const categoryData = ref(categoryDataMap)

const allResources = computed(() => {
  let resources = []
  Object.values(categoryDataMap).forEach(data => {
    resources = resources.concat(
      data.resources.map(resource => ({
        ...resource,
        category: data.categoryId,
        categoryName: data.categoryName
      }))
    )
  })
  return resources
})

const getCategoryResources = (categoryId) => {
  const data = categoryDataMap[categoryId]
  if (!data) return []
  return data.resources.map(resource => ({
    ...resource,
    category: data.categoryId,
    categoryName: data.categoryName
  }))
}

const getCategoryInfo = (categoryId) => {
  return categories.value.find(c => c.id === categoryId)
}

export const useResourceData = () => {
  return {
    categories,
    allResources,
    getCategoryResources,
    getCategoryInfo
  }
}