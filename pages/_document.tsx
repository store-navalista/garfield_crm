import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
   }

   render() {
      return (
         <Html>
            <Head>
               <link rel='shortcut icon' href='/favicon-96x96.png' />
            </Head>
            <body>
               <Main />
               <div id='portal' />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
