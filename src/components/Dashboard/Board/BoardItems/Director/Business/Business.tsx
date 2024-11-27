import { Tabs } from '@/constants/works'
import React, { FC, useState } from 'react'
import css from './Business.module.scss'
import { Menu } from './components/Menu/Menu'
import Design from './tabs/Design'
import Engineering from './tabs/Engineering'
import Supply from './tabs/Supply'
import UTM from './tabs/UTM'
import Vessels from './tabs/Vessels'

const Business: FC = () => {
   const [currentTab, setCurrentTab] = useState<(typeof Tabs)[number]>(Tabs[1])

   return (
      <div className={css.wrapper}>
         <Menu {...{ currentTab, setCurrentTab }} />
         {currentTab === 'vessels' ? <Vessels /> : null}
         {currentTab === 'design' ? <Design /> : null}
         {currentTab === 'engineering' ? <Engineering /> : null}
         {currentTab === 'supply' ? <Supply /> : null}
         {currentTab === 'utm' ? <UTM /> : null}
      </div>
   )
}

export default Business
