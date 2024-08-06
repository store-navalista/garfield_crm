import cert_desc from './cert.md'
import React, { FC } from 'react'
import 'swiper/css'
import 'swiper/css/effect-cards'
import MarkdownComponent from '@/HOC/MarkdownComponent'

type T = 'cert_desc'

interface IContent {
   type: T
   className: string
}

export const Content: FC<IContent> = ({ type, className }) => {
   switch (type) {
      case 'cert_desc':
         return <MarkdownComponent className={className} content={cert_desc} />
      default:
         return
   }
}
