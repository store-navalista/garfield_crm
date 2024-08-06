type Item = {
   url: string
   title: string
   icon: string
}

interface IPartners {
   powered: Item[]
   certified: Item[]
}

export const PARTNERS: IPartners = {
   powered: [
      { url: 'https://www.ssi-corporate.com/', title: 'SSI', icon: 'ssi.png' },
      {
         url: 'https://www.ssi-corporate.com/products/enterpriseplatform/',
         title: 'Enterprise Platform',
         icon: 'enterprise-platform.png'
      },
      { url: 'https://www.ndar.com/', title: 'NDAR', icon: 'ndar.png' },
      {
         url: 'https://www.ssi-corporate.com/products/shipconstructor/',
         title: 'Ship Constructor',
         icon: 'ship-constructor.png'
      }
   ],
   certified: [
      { url: 'https://www.bureauveritas.com.ua/', title: 'Bureau Veritas', icon: 'bureau-veritas.png' },
      { url: 'https://www.lr.org/en', title: "Lloyd's Register", icon: 'lloyd-register.png' },
      { url: 'https://www.rina.org/en', title: 'Rina', icon: 'rina.png' },
      { url: 'https://www.classnk.or.jp/', title: 'Nippon Kaiji Kyokai', icon: 'nippon-kaiji-kyokai.png' },
      { url: 'https://www.lima.gov.lr/', title: 'The Liberia Maritime', icon: 'the-liberia-maritime.png' },
      {
         url: 'https://www.msregister.com/',
         title: 'Mediterranean Shipping Register',
         icon: 'mediterranean-shipping-register.png'
      }
      // {
      //    url: 'http://www.shipregister.ua/',
      //    title: 'The Shipping Register of Ukraine',
      //    icon: 'the-shipping-register-of-ukraine.png'
      // }
   ]
}
