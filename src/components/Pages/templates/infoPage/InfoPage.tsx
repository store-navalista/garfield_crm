import React, { CSSProperties, FC, useState } from 'react'
import css from './InfoPage.module.scss'
import Image from 'next/image'
import useMD from '@/hooks/useMD'
import Loader from '@/components/UI/loader/Loader'
import translate from '@/i18n/translate'
import { useAppSelector } from '@/hooks/redux'
import { ImageLoader } from '@/components/UI/loader/ImageLoader'

type Options = {
   width?: number
   height?: number
}

type Content = {
   text: string[]
   image: string
}

const InfoPage: FC<{ content: Content; options: Options }> = ({ content, options }) => {
   if (!content) return <Loader />
   const Content = useMD()
   const pageID = useAppSelector((state) => state.reducer.content._id)
   const [isLoaded, setisLoaded] = useState(false)

   const { width, height } = options
   const w = width ? width : 1200
   const h = height ? height : 600
   const { text, image } = content

   return (
      <div className={css.wrapper}>
         <div
            style={{ '--width': `${w}px`, '--height': `${h}px`, '--aspect': w / h } as CSSProperties}
            className={css.image}
         >
            <h1 style={{ '--opacity': isLoaded ? 1 : 0 } as CSSProperties}>{translate(`page-${pageID}.title`)}</h1>
            <Image
               sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
               priority={true}
               src={`/assets/images/pages${image}`}
               alt='Info Image'
               onLoad={() => setisLoaded(true)}
               fill
            />
            {!isLoaded && <ImageLoader />}
         </div>
         {text.map((t, i) => (
            <Content key={i} className={css.text} type={t} />
         ))}
      </div>
   )
}

export default InfoPage
