import React, { FC, useEffect, useRef, useState } from 'react';
import useHover from '../../../hooks/useHover';
import st from './HeadingMain.module.scss';

const HeadingMain: FC<{ title: string }> = ({ title }) => {
	const [active, setActive] = useState(false);
	const ref = useRef();
	const isHovering = useHover(ref);

	useEffect(() => {
		if (isHovering) setActive(true);
	}, [isHovering, active])

	return (
		<p ref={ref} aria-label="heading" className={st.text + ` ${!active ? ' ' + st.disable : ''}`}>
			{title.toUpperCase().split('').map((letter, i) => {
				return <span key={i} data-text={letter}>{letter}</span>
			})}
		</p>
	)
}

export default HeadingMain;
