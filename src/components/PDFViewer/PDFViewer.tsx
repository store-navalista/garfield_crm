import { useGetFileQuery } from '@/store/reducers/fileApiReducer'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { openPlugin } from '@react-pdf-viewer/open'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { PDFServices } from '../Dashboard/Board/BoardItems/PDF/services'
import css from './PDFViewer.module.scss'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import Loader from '../UI/loader/Loader'
import translate from '@/i18n/translate'

function base64ToUint8Array(base64: string) {
   const binaryString = atob(base64)
   const len = binaryString.length
   const bytes = new Uint8Array(len)
   for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
   }
   return bytes
}

const Failed = () => {
   return (
      <div className={css.failed}>
         <p>{translate('pdf.messages-nocerts')}</p>
      </div>
   )
}

const PDFViewer: FC<{ fileName: string; filePath: string }> = ({ fileName, filePath }) => {
   const serv = useMemo(() => new PDFServices(), [])
   const [uint8Array, setUint8Array] = useState(null)

   const { data: file, isLoading, isSuccess, isError } = useGetFileQuery({ fileName, filePath })

   const zoomPluginInstance = zoomPlugin()
   const openPluginInstance = openPlugin()

   const defaultLayoutPluginInstance = defaultLayoutPlugin({
      sidebarTabs: (defaultTabs) => [defaultTabs[0]],
      renderToolbar: (Toolbar) => serv.renderToolbar(Toolbar, { zoom: true })
   })

   useEffect(() => {
      if (file?.buffer && isSuccess) {
         setUint8Array(base64ToUint8Array(file.buffer))
      }
   }, [file])

   if (isLoading && !uint8Array?.length) return <Loader />

   if (isError) return <Failed />

   return (
      <div className={css.wrapper}>
         <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
            <div className={css.pdf_viewer}>
               <Viewer
                  theme={{
                     theme: 'dark'
                  }}
                  plugins={[defaultLayoutPluginInstance, zoomPluginInstance, openPluginInstance]}
                  pageLayout={serv.pageLayout}
                  renderError={serv.renderError}
                  fileUrl={uint8Array || []}
                  defaultScale={2}
                  renderPage={serv.renderWithWaterMarks}

                  //  onDocumentLoad={() => setisPDFLoaded(true)}
               />
            </div>
         </Worker>
      </div>
   )
}

export default PDFViewer
