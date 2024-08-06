import Tooltip from '@/components/UI/tooltip/Tooltip'
import { useAppDispatch } from '@/hooks/redux'
import useHover from '@/hooks/useHover'
import { ContentActions } from '@/store/reducers/contentReducer'
import React, { useRef } from 'react'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import css from './QuickPanel.module.scss'
import Timer from './Timer/Timer'
import Button from './UI/Button/Button'
import Separator from './UI/Separator/Separator'
import { TPages, TServices } from '@/constants/pages'
import useFind from '@/hooks/useFind'

const QuickPanel = () => {
   const buttons = ['CAREERS', 'CERTS', 'ABOUT']
   const isHoveringRefs = buttons.map(() => useRef(null))
   const dispatch = useAppDispatch()

   return (
      <div className={css.wrapper}>
         {/* <Timer /> */}
         {buttons.map((b: TServices | TPages, i) => {
            const isHovering = useHover(isHoveringRefs[i])
            const { path } = useFind(b)

            return (
               <div ref={isHoveringRefs[i]} key={i}>
                  <Button
                     onClick={() => dispatch(ContentActions.setID(b))}
                     icon={`url(/assets/images/svg/header-${path}.svg)`}
                     href={path}
                  >
                     <Tooltip content={path} correctPosition={[4, 0]} isShow={isHovering} />
                  </Button>
               </div>
            )
         })}
         <Separator />
         <LanguageSwitcher type='desktop' />
      </div>
   )
}

export default QuickPanel
