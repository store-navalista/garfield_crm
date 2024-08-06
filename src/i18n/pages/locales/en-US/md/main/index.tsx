import MarkdownComponent from '@/HOC/MarkdownComponent'
import React, { FC } from 'react'
import cert_desc from './cert.md'

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
         return null
   }
}
