import { PhotoState } from '@/features/post-creator/PostCreator'

export function hasModifiedFile(photo: PhotoState): photo is PhotoState & { modifiedFile: File } {
   return photo.modifiedFile !== null
}
