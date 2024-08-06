export default class Services {
   type: number
   common_description: string
   colors = ['#29abe2', '#9dd251', '#eb5757']

   constructor({ type, job_description }: { type?: number; job_description?: string }) {
      this.type = type
      this.common_description = job_description
   }

   getColors() {
      return this.colors
   }

   getStyle() {
      switch (this.type) {
         case -0.5: // day of
            return {
               '--borderColor': this.colors[0],
               '--bg-icon': 'url(/assets/images/svg/timereport-days-dayof.svg)'
            }
         case -1: //sick day
            return {
               '--borderColor': this.colors[1],
               '--bg-icon': 'url(/assets/images/svg/timereport-days-sick.svg)'
            }
         case -1.5: //vacation
            return {
               '--borderColor': this.colors[2],
               '--bg-icon': 'url(/assets/images/svg/timereport-days-vac.svg)'
            }
         default: //default
            return {
               '--borderColor': '#fff'
            }
      }
   }

   private getModifiedComments() {
      const pattern = /\[\[(\d+)\]\](.*?)/g
      if (this.common_description) {
         const splitArr = this.common_description.split(pattern)
         return splitArr.filter((element) => element.trim() !== '')
      } else {
         return []
      }
   }

   unpackComments() {
      const filteredArr = this.getModifiedComments()

      const indexes = []
      const values = []

      for (let i = 0; i < filteredArr.length; i++) {
         if (i % 2 === 0) {
            indexes.push(filteredArr[i])
         } else {
            values.push(filteredArr[i])
         }
      }

      const result = Array(31).fill(null)

      indexes.forEach((i, index) => {
         result[i] = values[index]
      })

      return result
   }

   packComments(val: string, i: number) {
      const comments = this.unpackComments()
      comments[i] = val ? val : null

      const stringify = comments
         .map((c, index) => {
            if (c) {
               return [`[[${index}]]`, c].join('')
            }
         })
         .filter((c) => c)
         .join('')

      return stringify
   }
}
