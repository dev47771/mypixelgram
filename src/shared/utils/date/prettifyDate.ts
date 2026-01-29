export function prettifyDate(date: string) {
   return new Date(date).toLocaleDateString('ru', {
      dateStyle: 'short',
   })
}
