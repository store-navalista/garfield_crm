import React, { FC } from 'react'
import { Section } from './Section'
import css from './TypeAPage.module.scss'

export type BlockType = {
   title: string
   proverb: string
   description: string[]
   type?: 'rounded' | undefined
   img: string[]
}

export const TypeAPage: FC<any> = ({ content }) => {
   return (
      <div className={css.wrapper}>
         {content.map((block: BlockType, i: number) => {
            return <Section key={i} content={block} />
         })}
      </div>
   )
}
