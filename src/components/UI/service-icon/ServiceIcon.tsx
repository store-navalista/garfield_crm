import React, { FC } from 'react';
import st from './ServiceIcon.module.scss';

const Loader: FC<{ icon: string }> = ({ icon }) => {
	return (
		<div className={st.wrapper}>
			<div className={st.box}>
				<div className={st.loader}>
					<span><i />
						<div className={st.icon}
							style={{ backgroundImage: `url(/assets/images/svg/${icon})` }} />
					</span>
				</div>
			</div>
		</div>
	)
}

export default Loader;
