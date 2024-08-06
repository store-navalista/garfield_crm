import { ImageLoader } from '@/components/UI/loader/ImageLoader'
import Image from 'next/image'
import React, { FC, Fragment, useState } from 'react'
import { BlockType } from './TypeAPage'
import css from './TypeAPage.module.scss'

export const Section: FC<{ content: BlockType }> = ({ content }) => {
   const { title, proverb, description, img, type } = content
   const [isLoaded, setisLoaded] = useState(false)

   return (
      <section className={css.block}>
         <div className={css.text}>
            <h2>{title}</h2>
            <span>{proverb}</span>
         </div>
         <div className={css.text}>
            <div className={css.description}>
               {description.map((d, i) => {
                  return (
                     <>
                        {i !== 0 ? <br /> : null}
                        <p key={i}>{d}</p>
                     </>
                  )
               })}
            </div>
         </div>
         <div className={css.images}>
            <div className={css.wrap} data-type={type ? type : 'default'}>
               {img?.map((im, i) => {
                  return (
                     <Fragment key={im}>
                        <Image onLoad={() => setisLoaded(true)} src={im} fill alt='cads' />
                        {i === 0 && !isLoaded ? <div className={css.screen} /> : null}
                     </Fragment>
                  )
               })}
               {!isLoaded ? <ImageLoader /> : null}
            </div>
         </div>
      </section>
   )
}
