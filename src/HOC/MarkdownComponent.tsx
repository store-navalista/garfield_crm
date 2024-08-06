import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface IMD {
   className: string
   content: string
}

const MarkdownComponent: FC<IMD> = ({ className, content }) => {
   return (
      <div className={className}>
         <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
   )
}

export default MarkdownComponent
