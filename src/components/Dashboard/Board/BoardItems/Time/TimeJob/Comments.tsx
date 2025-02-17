import React, { FC } from 'react'
import css from './TimeJob.module.scss'

interface IComments {
   i: number
   updateCommentsHandler: any
   serv: any
}

const Comments: FC<IComments> = ({ i, updateCommentsHandler, serv }) => {
   const unpacked_notes = serv.unpackComments()[i]

   return (
      <div className={css.comments}>
         <textarea onChange={(e) => updateCommentsHandler(e.target.value)} value={unpacked_notes} />
      </div>
   )
}

export default Comments
