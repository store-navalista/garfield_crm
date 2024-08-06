import React, { FC } from 'react'
import css from './Board.module.scss'
import BoardViewport from './BoardViewport'

const Board: FC<{ isOpen: boolean }> = (isOpen) => {
   return (
      <div className={css.wrapper}>
         <BoardViewport {...isOpen} />
      </div>
   )
}

export default Board
