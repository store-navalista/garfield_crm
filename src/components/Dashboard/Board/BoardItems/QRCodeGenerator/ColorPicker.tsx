import useOutsideClick from '@/hooks/useOutsideClick'
import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import { ColorResult, SketchPicker } from 'react-color'
import { IOptions } from './QRCodeGenerator'
import css from './QRCodeGenerator.module.scss'

type ColorProps = {
   options: IOptions
   setOptions: Dispatch<SetStateAction<IOptions>>
}

const ColorPicker: FC<ColorProps> = ({ options, setOptions }) => {
   const ref = useRef(null)

   useOutsideClick(ref, () => setOptions((prevOptions) => ({ ...prevOptions, isColorPicker: false })))

   const handleColorChange = (color: ColorResult) => {
      setOptions({ ...options, color: color.rgb })
   }

   return (
      <div ref={ref} className={css.color_picker}>
         <button
            className={css.picker_btn}
            onClick={() => setOptions({ ...options, isColorPicker: !options.isColorPicker })}
         >
            <div style={{ backgroundColor: `rgba(${Object.values(options.color)})` }} />
         </button>
         {options.isColorPicker ? (
            <SketchPicker className={css.picker} color={options.color} onChange={handleColorChange} />
         ) : null}
      </div>
   )
}

export default ColorPicker
