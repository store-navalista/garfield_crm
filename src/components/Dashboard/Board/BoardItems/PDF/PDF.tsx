import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { openPlugin } from '@react-pdf-viewer/open'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import Image from 'next/image'
import { PDFDocument, PDFName, PDFPage, PDFString } from 'pdf-lib'
import { QRCodeCanvas } from 'qrcode.react'
import React, { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'
import CopyToClipboard from 'react-copy-to-clipboard'
import css from './PDF.module.scss'
import { PDFServices } from './services'
import { MUIStyles } from './Styles'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import translate from '@/i18n/translate'
import { CERTIFICATES_VALIDATE_URL } from '@/constants/files'

const CustomImage: FC<{ path: string; style?: CSSProperties }> = (props) => {
   const { path, style } = props

   return (
      <div style={{ position: 'relative', ...style }}>
         <Image src={`/assets/images/svg/${path}`} alt='nav' fill />
      </div>
   )
}

interface IPDFState {
   name: string
   imo: string
   cert_number: string
   url: string
   isColorPicker: boolean
   size: number
   color: Record<'r' | 'g' | 'b', number>
   fileUrl: string
   pdfDoc?: PDFDocument | null
   svg: string
   x: number
   y: number
   scale: number
   transparent: boolean
}

function PDF() {
   const [isPDFLoaded, setisPDFLoaded] = useState(false)
   const [PDFState, setPDFState] = useState<IPDFState>({
      isColorPicker: false,
      size: 200,
      name: '',
      imo: '9334648',
      cert_number: '12406003',
      url: '',
      color: { r: 0, g: 0, b: 0 },
      pdfDoc: null,
      fileUrl: '',
      svg: '',
      x: 5,
      y: 5,
      scale: 1.5,
      transparent: false
   })
   const qrRef = useRef(null)
   const pdfLayer = useRef(null)

   const zoomPluginInstance = zoomPlugin()
   const openPluginInstance = openPlugin()

   const { Open } = openPluginInstance

   const serv = useMemo(() => new PDFServices(), [])

   const defaultLayoutPluginInstance = defaultLayoutPlugin({
      sidebarTabs: (defaultTabs) => [defaultTabs[0]],
      renderToolbar: (Toolbar) => serv.renderToolbar(Toolbar)
   })

   const uploadFile = async (file: File) => {
      if (file) {
         const arrayBuffer = await file.arrayBuffer()
         const pdfDoc = await PDFDocument.load(arrayBuffer)
         const pdfBytes = await pdfDoc.save()
         const blob = new Blob([pdfBytes], { type: 'application/pdf' })

         const fileUrl = URL.createObjectURL(blob)
         setPDFState((prevState) => ({ ...prevState, fileUrl, pdfDoc, name: file.name.replace(/\.pdf$/, '') }))
      }
   }

   // must be corrected
   const downloadFile = () => {
      if (PDFState.fileUrl) {
         const link = document.createElement('a')
         link.href = PDFState.fileUrl
         link.download = `${PDFState.name}.pdf`
         link.click()
      }
   }

   const addLinkAnnotation = async (pdfDoc) => {
      const pages = pdfDoc.getPages()
      const firstPage = pages[0] as PDFPage

      const linkAnnotation = pdfDoc.context.obj({
         Type: 'Annot',
         Subtype: 'Link',
         Rect: [
            PDFState.x / 2,
            firstPage.getHeight() - PDFState.y / 2,
            40 * PDFState.scale + PDFState.x / 2,
            firstPage.getHeight() - 40 * PDFState.scale - PDFState.y / 2
         ],
         Border: [0, 0, 0],
         A: {
            Type: 'Action',
            S: 'URI',
            URI: PDFString.of(PDFState.url)
         }
      })

      const linkAnnotationRef = pdfDoc.context.register(linkAnnotation)

      firstPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([linkAnnotationRef]))

      return pdfDoc
   }

   const handleAddPng = async () => {
      if (qrRef.current && PDFState.pdfDoc) {
         try {
            const canvas = qrRef.current.querySelector('canvas')
            if (canvas) {
               const { x, y, scale, transparent } = PDFState
               const pages = PDFState.pdfDoc.getPages()
               const firstPage = pages[0]
               const context = canvas.getContext('2d')
               const imageData = context.getImageData(0, 0, 80, 80)

               // Make white pixels transparent
               if (transparent) {
                  const data = imageData.data
                  for (let i = 0; i < data.length; i += 4) {
                     if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
                        data[i + 3] = 0
                     }
                  }
               }

               context.putImageData(imageData, 0, 0)

               canvas.toBlob(async (blob: Blob) => {
                  if (blob) {
                     const pngImageBytes = await blob.arrayBuffer()
                     const pngImage = await PDFState.pdfDoc.embedPng(pngImageBytes)

                     firstPage.drawImage(pngImage, {
                        x: x / 2,
                        y: firstPage.getHeight() - y / 2 - 40 * scale,
                        width: 40 * scale,
                        height: 40 * scale
                     })

                     const pdfBytes = await PDFState.pdfDoc.save()
                     const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
                     const fileUrl = URL.createObjectURL(pdfBlob)
                     setPDFState((prevState) => ({ ...prevState, fileUrl }))
                  }
               }, 'image/png')

               await addLinkAnnotation(PDFState.pdfDoc)
            }
         } catch (error) {
            console.error('Error adding PNG to PDF:', error)
         }
      }
   }

   const handleColorChange = (next: ColorResult) => {
      setPDFState((prevState) => ({ ...prevState, color: next.rgb }))
   }

   const handleScaleChange = (e) => {
      setPDFState((prevState) => ({ ...prevState, scale: e.target.value }))
   }

   useEffect(() => {
      if (qrRef.current && PDFState.name) {
         const svgElement = qrRef.current.querySelector('svg')

         if (svgElement) {
            const svgString = new XMLSerializer().serializeToString(svgElement)
            setPDFState((prevState) => ({ ...prevState, svg: svgString }))
         }
      }
   }, [PDFState.name])

   useEffect(() => {
      const makeDraggable = (element: HTMLElement) => {
         let isDragging = false
         let offsetX = 0
         let offsetY = 0

         const onMouseDown = (e: MouseEvent) => {
            isDragging = true
            const rect = element.getBoundingClientRect()
            offsetX = e.clientX - rect.left - rect.width / 2
            offsetY = e.clientY - rect.top - rect.height / 2
            element.style.cursor = 'grabbing'
         }

         const onMouseMove = (e: MouseEvent) => {
            const isFrame = (e.target as HTMLDivElement).className === css.frame
            if (isDragging && isFrame) {
               const parentRect = element.parentElement.getBoundingClientRect()
               const elemRect = element.getBoundingClientRect()
               let left = e.clientX - offsetX - elemRect.width / 2 - parentRect.x
               let top = e.clientY - offsetY - elemRect.height / 2 - parentRect.y

               if (left < 0) left = 0
               if (top < 0) top = 0
               if (left + elemRect.width > parentRect.width) left = parentRect.width - elemRect.width
               if (top + elemRect.height > parentRect.height) top = parentRect.height - elemRect.height

               element.style.left = `${left}px`
               element.style.top = `${top}px`
            }
         }

         const onMouseUp = (e: MouseEvent) => {
            isDragging = false
            element.style.cursor = 'grab'
            const isFrame = (e.target as HTMLDivElement).className === css.frame
            if (isFrame) {
               const parentRect = element.parentElement.getBoundingClientRect()
               const elemRect = element.getBoundingClientRect()
               const left = e.clientX - offsetX - elemRect.width / 2 - parentRect.x
               const top = e.clientY - offsetY - elemRect.height / 2 - parentRect.y
               setPDFState((prevState) => ({
                  ...prevState,
                  x: left,
                  y: top
               }))
            }
         }

         element.addEventListener('mousedown', onMouseDown)
         document.addEventListener('mousemove', onMouseMove)
         document.addEventListener('mouseup', onMouseUp)

         return () => {
            element.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
         }
      }

      if (pdfLayer.current) {
         const layer = pdfLayer.current.querySelector('.rpv-core__page-layer')
         if (layer && !layer.querySelector(`.${css.frame}`)) {
            const frame = document.createElement('div')
            frame.classList.add(css.frame)
            layer.append(frame)
            makeDraggable(frame)
         }
      }
   }, [isPDFLoaded])

   useEffect(() => {
      setisPDFLoaded(false)
   }, [PDFState.pdfDoc])

   useEffect(() => {
      if (pdfLayer) {
         const frame = pdfLayer.current?.querySelector(`.${css.frame}`) as HTMLDivElement
         if (frame) {
            frame.style.width = `${78 * PDFState.scale}px`
            frame.style.height = `${78 * PDFState.scale}px`
         }
      }
   }, [PDFState.scale, isPDFLoaded])

   useEffect(() => {
      setPDFState((prevState) => ({
         ...prevState,
         url:
            CERTIFICATES_VALIDATE_URL +
            '?IMO=' +
            prevState.imo +
            '&certificate=' +
            prevState.cert_number +
            '&name=' +
            prevState.name
      }))
   }, [PDFState.imo, PDFState.cert_number, PDFState.name])

   return (
      <div className={css.wrapper}>
         <div className={css.navigate}>
            <div className={css.block}>
               <Open>
                  {() => (
                     <label className={css.button} htmlFor='file-upload'>
                        <CustomImage path='pdf-import.svg' />
                        <input
                           type='file'
                           id='file-upload'
                           onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                 uploadFile(e.target.files[0])
                              }
                           }}
                        />
                     </label>
                  )}
               </Open>
               <div className={css.tips}>{translate('dashboard.pdf-upload')}</div>
            </div>
            {!PDFState.pdfDoc ? <p style={{ marginLeft: '5px' }}>{translate('dashboard.pdf-upload')}</p> : null}
            {PDFState.pdfDoc ? (
               <>
                  <div className={css.block}>
                     <div onClick={handleAddPng} className={css.button}>
                        <CustomImage path='pdf-generate.svg' />
                     </div>
                     <div className={css.tips}>{translate('dashboard.pdf-generate')}</div>
                  </div>
                  <div className={css.block}>
                     <div onClick={downloadFile} className={css.button}>
                        <CustomImage path='pdf-save.svg' />
                     </div>
                     <div className={css.tips}>{translate('dashboard.pdf-save')}</div>
                  </div>
                  <div className={css.block}>
                     <div
                        onClick={() =>
                           setPDFState((prevState) => ({ ...prevState, isColorPicker: !prevState.isColorPicker }))
                        }
                        className={css.button}
                        style={{ overflow: 'auto' }}
                     >
                        <CustomImage path='pdf-color.svg' />
                     </div>
                     <div className={css.tips}>{translate('dashboard.pdf-style')}</div>
                  </div>
                  <div className={css.picker} style={{ display: PDFState.isColorPicker ? 'block' : 'none' }}>
                     <SketchPicker className={css.picker} color={PDFState.color} onChange={handleColorChange} />
                     <div ref={qrRef} className={css.qrc}>
                        <QRCodeCanvas
                           size={600}
                           value={PDFState.name}
                           fgColor={`rgb(${Object.values(PDFState.color)})`}
                        />
                     </div>
                  </div>
                  <input
                     className={css.input_imo}
                     value={PDFState.imo}
                     onChange={(e) => setPDFState((prevState) => ({ ...prevState, imo: e.target.value }))}
                  />
                  <input
                     className={css.input_number}
                     value={PDFState.cert_number}
                     onChange={(e) => setPDFState((prevState) => ({ ...prevState, cert_number: e.target.value }))}
                  />
                  <input
                     className={css.input_name}
                     value={PDFState.name}
                     onChange={(e) => setPDFState((prevState) => ({ ...prevState, name: e.target.value }))}
                  />
                  <CopyToClipboard text={PDFState.url} onCopy={() => alert('Copied to clipboard!')}>
                     <div className={css.block}>
                        <div className={css.button}>
                           <CustomImage path='pdf-copy.svg' />
                        </div>
                        <div className={css.tips}>{translate('dashboard.pdf-clipboard')}</div>
                     </div>
                  </CopyToClipboard>
                  <Box sx={MUIStyles.BoxStyle}>
                     <CustomImage style={{ width: '20px', aspectRatio: 1 }} path='zoom-out.svg' />
                     <Slider
                        sx={MUIStyles.SliderStyle}
                        onChange={handleScaleChange}
                        orientation='horizontal'
                        value={PDFState.scale}
                        defaultValue={1.5}
                        aria-label='Sound volume'
                        step={0.1}
                        color='primary'
                        valueLabelDisplay='auto'
                        min={1}
                        max={3}
                        marks
                     />
                     <CustomImage style={{ width: '20px', aspectRatio: 1 }} path='zoom-in.svg' />
                  </Box>
                  <div className={css.block}>
                     <div
                        onClick={() =>
                           setPDFState((prevState) => ({ ...prevState, fileUrl: '', name: '', pdfDoc: null }))
                        }
                        className={css.button}
                     >
                        <CustomImage path='pdf-clear.svg' />
                     </div>
                     <div className={css.tips}>{translate('dashboard.pdf-clear')}</div>
                  </div>
               </>
            ) : null}
         </div>
         <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
            {PDFState.fileUrl ? (
               <div ref={pdfLayer} className={css.pdf_viewer}>
                  <Viewer
                     theme={{
                        theme: 'dark'
                     }}
                     plugins={[defaultLayoutPluginInstance, zoomPluginInstance, openPluginInstance]}
                     pageLayout={serv.pageLayout}
                     renderError={serv.renderError}
                     fileUrl={PDFState.fileUrl}
                     defaultScale={2}
                     onDocumentLoad={() => setisPDFLoaded(true)}
                  />
               </div>
            ) : null}
         </Worker>
      </div>
   )
}

export default PDF
