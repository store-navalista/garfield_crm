import { SERVICES } from '@/constants/pages'
import { TServicesObjectProps } from '@/constants/types'
import React, { CSSProperties, FC } from 'react'
import ExploreButton from '../../UI/btn-explore/ExploreButton'
import st from './MainBlockService.module.scss'

const MainBlockService: FC<{ blocks: TServicesObjectProps[] }> = ({ blocks }) => {
   const letters = 137

   return (
      <>
         {blocks.map((block, i) => {
            const { title, description } = Object.values(block)[0]
            const [key] = Object.keys(block)
            const { path, icon } = SERVICES.find((s) => key in s)[key]

            return (
               <div key={i} className={st.block}>
                  <span className={st.border} />
                  <div>
                     <h2>{title}</h2>
                     <span
                        style={
                           {
                              '--background-image': `url(/assets/images/svg/${icon}.svg)`
                           } as CSSProperties
                        }
                     />
                  </div>
                  <p>{description.substring(0, letters)}...</p>
                  <ExploreButton href={path} />
               </div>
            )
         })}
      </>
   )
}

export default MainBlockService
