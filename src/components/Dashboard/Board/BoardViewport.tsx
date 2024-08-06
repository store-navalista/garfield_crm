import React, { CSSProperties, FC, useEffect, useState } from 'react'
import css from './Board.module.scss'
import BoardList from './BoardList'

const BoardViewport: FC<{ isOpen: boolean }> = ({ isOpen }) => {
   const [widthStyle, setWidthStyle] = useState<CSSProperties>({})

   useEffect(() => {
      if (isOpen) {
         setWidthStyle({ '--width': 'calc(100% - 300px)' } as CSSProperties)
      } else {
         setWidthStyle({ '--width': 'calc(100% - 40px' } as CSSProperties)
      }
   }, [isOpen])

   return (
      <div style={{ ...widthStyle } as CSSProperties} className={css.viewport}>
         <BoardList isOpen={isOpen} />
      </div>
   )
}

export default BoardViewport
