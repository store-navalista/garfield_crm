import QRCode from 'qrcode.react'
import React, { useEffect, useRef, useState } from 'react'
import { ColorResult } from 'react-color'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ColorPicker from './ColorPicker'
import css from './QRCodeGenerator.module.scss'

export interface IOptions {
   size: number
   isColorPicker: boolean
   color: ColorResult['rgb']
}

const QRCodeGenerator = () => {
   const [options, setOptions] = useState<IOptions>({
      size: 370,
      isColorPicker: false,
      color: { r: 1, g: 63, b: 78, a: 1 }
   })
   const qrRef = useRef(null)
   const [data, setData] = useState({
      text: '',
      svg: ''
   })

   const copyQRCToClipboard = () => {
      if (qrRef.current) {
         const svgElement = qrRef.current.querySelector('svg')

         if (svgElement) {
            const svgString = new XMLSerializer().serializeToString(svgElement)
            setData((prevData) => ({ ...prevData, svg: svgString }))
         }
      }
   }

   const downloadQRCSVG = () => {
      if (qrRef.current) {
         const svgElement = qrRef.current.querySelector('svg')
         if (svgElement) {
            const svgString = new XMLSerializer().serializeToString(svgElement)
            const blob = new Blob([svgString], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'qrcode.svg'
            a.click()
            URL.revokeObjectURL(url)
         }
      }
   }

   const downloadQRCPNG = () => {
      if (qrRef.current) {
         const canvas = qrRef.current.querySelector('canvas')
         if (canvas) {
            const context = canvas.getContext('2d')
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
               if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
                  data[i + 3] = 0
               }
            }

            context.putImageData(imageData, 0, 0)

            canvas.toBlob((blob) => {
               const url = URL.createObjectURL(blob)
               const a = document.createElement('a')
               a.href = url
               a.download = 'qrcode.png'
               a.click()
               URL.revokeObjectURL(url)
            }, 'image/png')
         }
      }
   }

   useEffect(() => {
      copyQRCToClipboard()
   }, [data.text])

   return (
      <div className={css.wrapper}>
         <h2>QR Code Generator</h2>
         <input
            type='text'
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
            placeholder='https://store.navalista.com/some_share'
         />
         <div className={css.botton_panel}>
            <div className={css.buttons}>
               <button
                  onClick={() => setOptions((prevOptions) => ({ ...prevOptions, size: prevOptions.size - 50 }))}
                  className={css.picker_btn}
               >
                  -
               </button>
               <button
                  onClick={() => setOptions((prevOptions) => ({ ...prevOptions, size: prevOptions.size + 50 }))}
                  className={css.picker_btn}
               >
                  +
               </button>
               <CopyToClipboard text={data.text} onCopy={() => alert('Copied to clipboard!')}>
                  <button className={css.labeled}>Copy text</button>
               </CopyToClipboard>
               <CopyToClipboard text={data.svg} onCopy={() => alert('SVG Copied to clipboard!')}>
                  <button className={css.labeled}>
                     <span className={css.copy_icon} /> SVG
                  </button>
               </CopyToClipboard>
               <button onClick={downloadQRCSVG} className={css.labeled}>
                  <span className={css.copy_download} /> SVG
               </button>
               <button onClick={downloadQRCPNG} className={css.labeled}>
                  <span className={css.copy_download} /> PNG
               </button>
            </div>
         </div>

         <div className={css.qrcode}>
            <div ref={qrRef}>
               {['svg', 'canvas'].map((format) => (
                  <QRCode
                     key={format}
                     renderAs={format as 'svg' | 'canvas'}
                     value={data.text}
                     style={{ display: format === 'canvas' ? 'none' : 'block' }}
                     size={options.size}
                     fgColor={`rgba(${Object.values(options.color)})`}
                  />
               ))}
            </div>
            <div className={css.right_panel}>
               <ColorPicker {...{ options, setOptions }} />
            </div>
         </div>
      </div>
   )
}

export default QRCodeGenerator
