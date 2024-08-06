import React, { FC } from 'react'
import css from './Button.module.scss'

type PlayButtonProps = {
   handle(): void
   isEnable: boolean
   toggleIcons?: [string, string]
}

const PlayButton: FC<PlayButtonProps> = ({ handle, isEnable, toggleIcons = ['pause', 'play'] }) => (
   <button
      style={{ backgroundImage: `url(/assets/images/radio/${isEnable ? toggleIcons[0] : toggleIcons[1]}.svg)` }}
      className={css.play_button}
      onClick={handle}
      data-enable={!isEnable}
   />
)

export default PlayButton
