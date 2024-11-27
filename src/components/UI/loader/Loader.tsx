import React, { CSSProperties, FC } from 'react'
import st from './Loader.module.scss'

const Loader: FC<{ className?: string; scale?: number }> = ({ className, scale }) => {
   return (
      <div className={st.wrapper + ` ${className ? className : ''}`} style={{ '--scale': scale } as CSSProperties}>
         <div className={st.box}>
            <div className={st.loader}>
               <span>
                  <i />
               </span>
            </div>
         </div>
      </div>
   )
}

export default Loader
