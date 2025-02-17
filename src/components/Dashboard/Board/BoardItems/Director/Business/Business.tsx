import { participants, Tabs } from '@/constants/works'
import React, { FC, useState } from 'react'
import css from './Business.module.scss'
import { Menu } from './components/Menu/Menu'
import ParticipantsTable from './tabs/ParticipantsTable'
import WorksTable from './tabs/WorksTable'

const Business: FC = () => {
   const [currentTab, setCurrentTab] = useState<(typeof Tabs)[number]>(Tabs[0])
   const [currentParticipant, setCurrentParticipant] = useState(participants[0])
   const tabs = Array.from({ length: participants?.length }, (_, i) => i)

   return (
      <div className={css.wrapper}>
         <Menu {...{ currentTab, setCurrentTab }} />
         {currentTab === 'participant' ? (
            <ParticipantsTable {...{ type: currentParticipant, setCurrentParticipant, tabs }} />
         ) : (
            <WorksTable table_type={currentTab} />
         )}
      </div>
   )
}

export default Business
