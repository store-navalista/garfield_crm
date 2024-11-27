import { Tabs } from '@/constants/works'
import React, { CSSProperties, FC } from 'react'
import css from './Menu.module.scss'

type TabsType = {
   currentTab: (typeof Tabs)[number]
   setCurrentTab: React.Dispatch<React.SetStateAction<(typeof Tabs)[number]>>
}

const tips: Record<(typeof Tabs)[number], string> = {
   vessels: 'Vessels list',
   design: 'Design works',
   engineering: 'Engineering works',
   supply: 'Supply works',
   utm: 'UTM works'
}

export const Menu: FC<TabsType> = ({ currentTab, setCurrentTab }) => {
   return (
      <div className={css.wrapper}>
         {Tabs.map((t) => {
            const styles = {
               '--bg-image': `url(/assets/images/svg/dashboard.business-menu-${t}.svg)`,
               boxShadow: currentTab === t ? 'var(--shadow-out)' : 'var(--shadow-aside)',
               opacity: currentTab === t ? '1' : '0.6'
            }

            return (
               <div key={t}>
                  <button onClick={() => setCurrentTab(t)} style={styles as CSSProperties} />
                  <span>{tips[t]}</span>
               </div>
            )
         })}
      </div>
   )
}
