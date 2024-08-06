import React, { CSSProperties, FC } from 'react'
import css from './ProgressBar.module.scss'
import { useAppSelector } from '@/hooks/redux'

const ProgressBar: FC = () => {
   const progress = useAppSelector((state) => state.reducer.content.progress)

   return (
      <div
         style={{ '--progress': `${progress}%`, display: progress ? 'flex' : 'none' } as CSSProperties}
         className={css.progressBar}
      >
         <span />
      </div>
   )
}

export default ProgressBar
