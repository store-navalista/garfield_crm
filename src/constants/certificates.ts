export type CertTypes = 'QMSYSTEM' | 'UTM' | 'IHM' | 'SSCALC' | 'CONFCERT'

export interface ICert {
   title: string
   desc: string
   img: string
   active?: boolean
}

type ICERT = {
   [key in CertTypes]?: ICert[]
}

export const CERTIFICATES: ICERT[] = [
   {
      QMSYSTEM: [
         {
            title: 'Bureau Veritas',
            desc: 'Certificate of Quality Management System Conformity',
            img: 'bureau-veritas-certification-eng.jpg'
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Certificate of Quality Management System Conformity',
            img: 'russian-maritime-register-of-shiping-certificate-eng.jpg'
         },
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Certificate of Quality Management System Conformity',
            img: 'shipping-register-of-ukraine-conformity-certificate-eng.jpg'
         },
         {
            title: 'Bureau Veritas',
            desc: 'Сертифікат Відповідності Системи Управління Якістю',
            img: 'bureau-veritas-certification-rus.jpg'
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Cертификат Cоответствия Cистемы Менеджмента Качества',
            img: 'russian-maritime-register-of-shiping-certificate-rus.jpg'
         },
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Cертификат Соответствия Системы Менеджмента Качества',
            img: 'shipping-register-of-ukraine-conformity-certificate-rus.jpg'
         },
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Cертифікат Відповідності Системи Управління Якістю',
            img: 'shipping-register-of-ukraine-conformity-certificate-ukr.jpg'
         }
      ]
   },
   {
      UTM: [
         {
            title: 'Nippon Kaiji Kyokai',
            desc: 'Certificate of Approval - Ultrasonic Thickness Measurement (UTM)',
            img: 'nippon-kaiji-kyokai-certificate-eng.jpg'
         },
         {
            title: 'RINA',
            desc: 'Certificate of Approval of Service Supplier - Ultrasonic Thickness Measurement (UTM)',
            img: 'rina-certificate-of-approval-of-service-supplier.jpg'
         },
         {
            title: 'RINA',
            desc: 'Certificate of Approval of Service Supplier - Ultrasonic Thickness Measurement (UTM) - Attachment',
            img: 'rina-certificate-of-approval-of-service-supplier-attachment.jpg'
         },
         {
            title: 'Mediterranean Shipping Register (MSR)',
            desc: 'Approved Service Supplier Certificate - Ultrasonic Thickness Measurements (UTM)',
            img: 'mediterranean-shipping-register-MSR-approved-service-supplier-certificate-ultrasonic-thickness-measurements-UTM.jpg'
         },
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Recognition Certificate - Ultrasonic Thickness Measurement (UTM)',
            img: 'shipping-register-of-ukraine-recognition-certificate-eng.jpg'
         },
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Recognition Certificate - Ultrasonic Thickness Measurement (UTM) - (Annex)',
            img: 'shipping-register-of-ukraine-recognition-certificate-annex-eng.jpg'
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Recognition Certificate - Ultrasonic Thickness Measurement (UTM)',
            img: 'russian-maritime-register-of-shiping-recognition-certificate-utm-eng.jpg'
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Recognition Certificate - Ultrasonic Thickness Measurement (UTM) - (Annex)',
            img: 'russian-maritime-register-of-shiping-recognition-certificate-utm-annex-eng.jpg'
         }
      ]
   },
   {
      IHM: [
         {
            title: 'The Republic of Liberia',
            desc: 'Acceptance of IHM Expert Company',
            img: 'liberia-maritime-authority-eng.jpg'
         },
         {
            title: 'RINA',
            desc: 'Statement of Achievement - Certified HAZMAT Expert Artem Vasiliev',
            img: 'rina-certify-expert-artem-vasiliev.jpg',
            active: true
         },
         {
            title: 'RINA',
            desc: 'Statement of Achievement - Certified HAZMAT Expert Denys Chernyshov',
            img: 'rina-certify-expert-denis-chernyshov.jpg',
            active: true
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Recognition Certificate - Visual and/or sampling checks, development of hazardous material inventories',
            img: 'russian-maritime-register-of-shiping-recognition-certificate-eng.jpg'
         },
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Recognition Certificate - Visual and/or sampling checks, development of hazardous material inventories - (Annex)',
            img: 'russian-maritime-register-of-shiping-recognition-certificate-annex-eng.jpg'
         },
         {
            title: 'Mediterranean Shipping Register (MSR)',
            desc: 'Approved Service Supplier Certificate Inventory of Hazardous Materials IHM',
            img: 'mediterranean-shipping-register-MSR-approved-service-supplier-certificate-inventory-of-hazardous-materials-IHM.jpg'
         }
      ]
   },
   {
      SSCALC: [
         {
            title: 'Russian Maritime Register of Shipping',
            desc: 'Conformity Certificate - Shore-based Centre for Damage Stability and Residual Structural Strength Calculation',
            img: 'russian-maritime-register-of-shiping-conformity-certificate-eng.jpg'
         },
         {
            title: 'Mediterranean Shipping Register (MSR)',
            desc: 'Approved Service Supplier Certificate - Shore-based Centre for Damage Stability and Residual Structural Strength Calculation',
            img: 'mediterranean-shipping-register-MSR-approved-service-supplier-certificate-srtuctural-calculation.jpg'
         }
      ]
   },
   {
      CONFCERT: [
         {
            title: 'Shipping Register of Ukraine',
            desc: 'Certificate of Enterprise Conformity',
            img: 'shipping-register-of-ukraine-certificate-of-enterprise-conformity-eng.jpg'
         }
      ]
   }
]
