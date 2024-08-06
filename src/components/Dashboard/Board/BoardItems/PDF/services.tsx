import React, { ReactElement } from 'react'
import css from './Styles.module.scss'

export class PDFServices {
   get pageLayout() {
      return {
         transformSize: ({ size }) => ({
            height: size.height + 30,
            width: size.width + 30
         })
      }
   }

   renderToolbar(Toolbar: (slots) => ReactElement, options: { zoom?: boolean } = {}) {
      const { zoom } = options

      return (
         <Toolbar>
            {(slots) => {
               const { ZoomOut, ZoomIn } = slots
               return (
                  <div className={css.panel}>
                     {zoom ? (
                        <>
                           <div className={css.zoom_button}>
                              <ZoomOut>{(props) => <button onClick={props.onClick}>-</button>}</ZoomOut>
                           </div>
                           <div className={css.zoom_button}>
                              <ZoomIn>{(props) => <button onClick={props.onClick}>+</button>}</ZoomIn>
                           </div>
                        </>
                     ) : null}
                  </div>
               )
            }}
         </Toolbar>
      )
   }

   renderError(error: { name: string }) {
      let message = ''
      switch (error.name) {
         case 'InvalidPDFException':
            message = 'The document is invalid or corrupted'
            break
         case 'MissingPDFException':
            message =
               'Unfortunately, the active time of the certificate has expired or it has not yet been uploaded to the site. Perhaps it will appear in the near future. Thank you.'
            break
         case 'UnexpectedResponseException':
            message = 'Unexpected server response'
            break
         default:
            message = 'Cannot load the document'
            break
      }

      return (
         <div
            style={{
               alignItems: 'center',
               display: 'flex',
               height: '100%',
               justifyContent: 'center',
               padding: '10px',
               backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}
         >
            <div
               style={{
                  backgroundColor: '#e53e3e',
                  borderRadius: '0.25rem',
                  color: '#fff',
                  padding: '0.5rem'
               }}
            >
               {message}
            </div>
         </div>
      )
   }

   renderWithWaterMarks(props) {
      return (
         <>
            {props.canvasLayer.children}
            <div className={css.water_marks} style={{ fontSize: `${6 * props.scale}rem` }}>
               DOCUMENT VERIFIED
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
         </>
      )
   }
}
