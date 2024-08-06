import { useAppDispatch } from '@/hooks/redux'
import { ContentActions } from '@/store/reducers/contentReducer'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

interface IConditionalLinkProps {
   id: string
   href: string
   as?: string
   children: ReactNode
   disabled?: boolean
   className?: string
}

const ConditionalLink: FC<IConditionalLinkProps> = ({ href, as, children, className, id }) => {
   const dispatch = useAppDispatch()

   return (
      <Link href={href} as={as} passHref legacyBehavior>
         <a onClick={() => dispatch(ContentActions.setID(id))} className={className}>
            {children}
         </a>
      </Link>
   )
}

export default ConditionalLink
