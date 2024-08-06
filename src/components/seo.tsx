import React, { FC } from 'react'
import Head from 'next/head'

interface ISeo {
   siteTitle: string
   pageTitle: string
   description: string
}

const Seo: FC<ISeo> = ({ description = 'Error', pageTitle = 'Error Page', siteTitle = 'Keelward' }) => {
   return (
      <Head>
         <title>{siteTitle ? `${siteTitle} | ${pageTitle}` : 'Keelward | Error'}</title>
         <meta charSet='utf-8' />
         <meta name='viewport' content='width=device-width, initial-scale=1.0' />
         <meta name='description' content={description} />
         <meta name='author' content='Sergey Otinov | Сергей Отинов' />
         <meta property='og:type' content='website' />
         <meta property='og:title' content={pageTitle} />
         <meta property='og:description' content={description} />
         <meta property='og:site_name' content={siteTitle} />
         <meta property='twitter:card' content='summary' />
         <meta property='twitter:title' content={pageTitle} />
         <meta property='twitter:description' content={description} />
      </Head>
   )
}

export default Seo
