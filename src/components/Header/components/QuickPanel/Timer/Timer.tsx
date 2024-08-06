import React, { FC, useRef } from 'react'
import css from '../QuickPanel.module.scss'
import Button from '../UI/Button/Button'
import { useAppSelector } from '@/hooks/redux'
import useHover from '@/hooks/useHover'
import Tooltip from '@/components/UI/tooltip/Tooltip'

const Timer = () => {
   const isMobile = useAppSelector((state) => state.reducer.content.mediaQuery.isMobile)
   const ref = useRef(null)
   const isHovering = useHover(ref)

   const handler = () => {
      return
   }

   return !isMobile ? (
      <div ref={ref} className={css.timer}>
         <Button type='button' onClick={handler} />
         <Tooltip content='timer' correctPosition={[4, 0]} isShow={isHovering} />
      </div>
   ) : null
}

export default Timer
