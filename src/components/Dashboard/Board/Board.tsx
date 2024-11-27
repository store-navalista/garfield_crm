import React, { FC } from 'react'
import css from './Board.module.scss'
import BoardViewport from './BoardViewport'
import { SnackbarProvider } from 'notistack'

const Board: FC<{ isOpen: boolean }> = (isOpen) => {
   return (
      <SnackbarProvider maxSnack={3}>
         <div className={css.wrapper}>
            <BoardViewport {...isOpen} />
         </div>
      </SnackbarProvider>
   )
}

export default Board
