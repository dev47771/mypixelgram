'use client'

import { useCallback } from 'react'
import { PhotoState } from '../PostCreator'
import { applyFilterToImage } from '../utils/applyImageFilter'

export const useApplyFilters = () => {
   const applyFiltersToAllPhotos = useCallback(async (photos: PhotoState[]): Promise<File[]> => {
      try {
         const processedPhotos = await Promise.all(photos.map(photo => applyFilterToImage(photo)))
         return processedPhotos
      } catch (error) {
         console.error('Error applying filters:', error)
         throw new Error('Failed to process images with filters')
      }
   }, [])

   return { applyFiltersToAllPhotos }
}
