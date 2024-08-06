import React, { CSSProperties, FC } from 'react'
import css from './ImageLoader.module.scss'

export const ImageLoader: FC<{ width?: string }> = ({ width = '100px' }) => {
   return <div className={css.loader} style={{ '--width': width } as CSSProperties} />
}
