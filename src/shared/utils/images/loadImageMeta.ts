export const loadImageMeta = (src: string): Promise<{ width: number; height: number }> => {
   return new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve({ width: img.width, height: img.height })
      img.src = src
   })
}
