import React, { FC } from 'react';
import st from './BurgerButton.module.scss';

interface IBurgerButton {
	scrollStep: number;
	isOpen: boolean;
	setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerButton: FC<IBurgerButton> = ({ scrollStep, isOpen, setisOpen }) => {
	return (
		<button onClick={() => setisOpen(!isOpen)} className={st.wrapper}>
			<div
				className={st.hamburglar + ` ${isOpen ? st.isOpen : st.isClosed}`}
				style={{ transform: `scale(${scrollStep > 0 ? '0.5' : '0.6'})` }}>
				<div className={st.burgerIcon}>
					<div className={st.burgerContainer}>
						<span />
						<span />
						<span />
					</div>
				</div>
				<div className={st.burgerRing}>
					<svg>
						<path fill="none" strokeMiterlimit="10" strokeWidth="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
					</svg>
				</div>
				<svg width="0" height="0">
					<mask id="mask">
						<path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" strokeMiterlimit="10" strokeWidth="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
					</mask>
				</svg>
				<div className={st.pathBurger}>
					<div>
						<div></div>
					</div>
				</div>
			</div>
		</button>
	)
}

export default BurgerButton;