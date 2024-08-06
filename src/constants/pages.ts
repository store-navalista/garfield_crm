export type TServices =
   | 'SD'
   | 'BWTS'
   | 'TOWAGE'
   | 'BOOKLETS'
   | 'TONNAGE'
   | 'CARGO'
   | 'MACHINERY'
   | 'SCANSURV'
   | 'ERS'
   | 'REPAIR'
   | 'UTM'
   | 'IHM'
   | 'CONDSURV'
   | 'EEXI'
   | 'TECHADV'
   | 'LEGALADV'
   | 'SHIPREG'
   | 'SCANSURVCIV'

export type TPages = 'HOME' | 'ABOUT' | 'CONTACTS' | 'CERTS' | 'BROCH' | 'CAREERS' | 'INSTRUCTIONS' | 'WORKS'

interface Submenu {
   brochure?: string
   works?: string
}

export interface Page {
   path: string
   image?: string
   submenu?: Submenu
   icon?: string
   MD?: any
   release?: boolean
}

type TChapters = { [key: string]: TServices[] | TPages[] }[]

export const CHAPTERS: TChapters = [
   { chapter_1: ['SD', 'BWTS', 'TOWAGE', 'BOOKLETS', 'TONNAGE', 'CARGO', 'MACHINERY', 'SCANSURV', 'ERS'] },
   { chapter_2: ['REPAIR', 'UTM'] },
   { chapter_3: ['IHM', 'CONDSURV', 'EEXI'] },
   { chapter_4: ['TECHADV', 'LEGALADV', 'SHIPREG'] },
   { chapter_5: ['SCANSURVCIV'] }
]

export const MENU = [
   {
      chapter_main: ['HOME', 'ABOUT', 'CONTACTS', 'CERTS', 'BROCH', 'CAREERS', 'INSTRUCTIONS', 'WORKS']
   },
   ...CHAPTERS
]

type IServices = {
   [key in TServices]?: Page
}

type IPages = {
   [key in TPages]?: Page
}

export const SERVICES: IServices[] = [
   {
      SD: {
         path: 'ship-design',
         image: 'ship-design.jpg',
         icon: 'main-block-sd',
         submenu: {
            brochure: '/',
            works: '/'
         }
      }
   },
   {
      BWTS: {
         path: 'ballast-water-treatment-system-design-and-installation',
         image: 'bwts.jpg',
         icon: 'main-block-bwts'
      }
   },
   {
      TOWAGE: {
         path: 'towage-and-passage',
         image: 'towage.jpg',
         MD: {
            text: ['block_1'],
            image: '/towage-and-passage/title.jpg'
         },
         release: true
      }
   },
   {
      BOOKLETS: {
         path: 'ship-technical-booklets',
         image: 'booklets.jpg'
      }
   },
   {
      TONNAGE: {
         path: 'tonnage-calculation',
         image: 'tonnage.jpg',
         MD: {
            text: ['block_1'],
            image: '/tonnage-calculation/title.jpg'
         }
      }
   },
   {
      CARGO: {
         path: 'heavy-lift-oversized-cargo',
         image: 'heavy-lift.jpg'
      }
   },
   {
      MACHINERY: {
         path: 'system-and-machinery',
         image: 'machinery.jpg'
      }
   },
   {
      SCANSURV: {
         path: 'scanning-survey',
         image: 'scanning-survey.jpg',
         icon: 'main-block-scan'
      }
   },
   {
      ERS: {
         path: 'emergency-response-service',
         image: 'ers.jpg'
      }
   },
   {
      REPAIR: {
         path: 'shipbuilding-and-ship-repair',
         image: 'repair.jpg'
      }
   },
   {
      UTM: {
         path: 'ultrasonic-thickness-measurements',
         image: 'utm.jpg'
      }
   },
   {
      IHM: {
         path: 'inventory-of-hazardous-materials',
         image: 'ihm.jpg',
         icon: 'main-block-ihm'
      }
   },
   {
      CONDSURV: {
         path: 'ships-condition-related-surveys',
         image: 'condsurv.jpg'
      }
   },
   {
      EEXI: {
         path: 'energy-efficiency-existing-ship-index',
         image: 'eexi.jpg'
      }
   },
   {
      TECHADV: {
         path: 'technical-advisory-and-consultancy',
         image: 'techadv.jpg'
      }
   },
   {
      LEGALADV: {
         path: 'legal-advisory-and-consultancy',
         image: 'legaladv.jpg'
      }
   },
   {
      SHIPREG: {
         path: 'ship-registration',
         image: 'shipreg.jpg'
      }
   },
   {
      SCANSURVCIV: {
         path: 'scanning-civil-engineering',
         image: 'scansurvciv.jpg'
      }
   }
]

export const PAGES: IPages[] = [
   {
      HOME: {
         path: '/'
      }
   },
   {
      ABOUT: {
         path: 'about-us',
         MD: {
            text: ['block_1'],
            image: '/about-us/title.jpg'
         },
         release: true
      }
   },
   {
      CONTACTS: {
         path: 'our-contacts'
      }
   },
   {
      CERTS: {
         path: 'certificates'
      }
   },
   {
      BROCH: {
         path: 'brochures'
      }
   },
   {
      CAREERS: {
         path: 'careers'
      }
   },
   {
      INSTRUCTIONS: {
         path: 'instructions'
      }
   },
   {
      WORKS: {
         path: 'our-works'
      }
   }
]
