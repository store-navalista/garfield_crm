const url = '/assets/images/pages/ship-design/'

const SD_OPTIONS = [
   {
      img: [`${url}images-bg.png`, `${url}draw-1.png`]
   },
   {
      type: 'rounded',
      img: [`${url}draw-2.jpg`]
   },
   {
      img: [`${url}images-bg.png`, `${url}draw-3.png`]
   },
   {
      type: 'rounded',
      img: [`${url}draw-4.jpg`]
   },
   {
      img: [`${url}images-bg.png`, `${url}draw-5.png`]
   },
   {
      img: [`${url}draw-6.jpg`]
   },
   {
      img: [`${url}draw-7.jpg`]
   },
   {
      img: [`${url}draw-8.jpg`]
   },
   {
      type: 'rounded',
      img: [`${url}draw-9.jpg`]
   }
]

export function SD_union(cnt) {
   const union = cnt.content.map((c, i) => {
      return { ...c, ...SD_OPTIONS[i] }
   })

   return { ...cnt, content: union }
}
