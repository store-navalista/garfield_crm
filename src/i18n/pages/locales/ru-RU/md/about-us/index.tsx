import MarkdownComponent from '@/HOC/MarkdownComponent'
import React, { FC } from 'react'
import block_1 from './block_1.md'

type T = 'block_1'

interface IContent {
   type: T
   className: string
}

export const Content: FC<IContent> = ({ type, className }) => {
   switch (type) {
      case 'block_1':
         return <MarkdownComponent className={className} content={block_1} />
      default:
         return null
   }
}
